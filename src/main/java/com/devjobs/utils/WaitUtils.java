package com.devjobs.utils;

import com.devjobs.config.ConfigManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import java.time.Duration;

public class WaitUtils {
    private static final int DEFAULT_TIMEOUT = ConfigManager.getInstance().getTimeout();

    public static WebDriverWait getWait(WebDriver driver) {
        return new WebDriverWait(driver, Duration.ofSeconds(DEFAULT_TIMEOUT));
    }

    public static WebDriverWait getWait(WebDriver driver, int timeoutInSeconds) {
        return new WebDriverWait(driver, Duration.ofSeconds(timeoutInSeconds));
    }

    public static WebElement waitForVisibility(WebDriver driver, By locator) {
        return getWait(driver).until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    public static WebElement waitForClickability(WebDriver driver, By locator) {
        return getWait(driver).until(ExpectedConditions.elementToBeClickable(locator));
    }

    public static boolean waitForInvisibility(WebDriver driver, By locator) {
        return getWait(driver).until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }

    public static void waitForTextToBePresentInElement(WebDriver driver, By locator, String text) {
        getWait(driver).until(ExpectedConditions.textToBePresentInElementLocated(locator, text));
    }

    public static void waitForPageToLoad(WebDriver driver) {
        waitForPageToLoad(driver, DEFAULT_TIMEOUT);
    }

    public static void waitForPageToLoad(WebDriver driver, int timeoutInSeconds) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutInSeconds));

        // Wait for document ready state
        wait.until(webDriver ->
                ((JavascriptExecutor) webDriver).executeScript("return document.readyState").equals("complete"));

        // Wait for jQuery to finish (if present)
        wait.until(webDriver -> {
            try {
                return (Boolean) ((JavascriptExecutor) webDriver)
                        .executeScript("return typeof jQuery === 'undefined' || jQuery.active === 0");
            } catch (Exception e) {
                return true; // jQuery not present
            }
        });

        // Wait for Angular to finish (if present)
        wait.until(webDriver -> {
            try {
                return (Boolean) ((JavascriptExecutor) webDriver)
                        .executeScript("return typeof angular === 'undefined' || angular.element(document).injector().get('$http').pendingRequests.length === 0");
            } catch (Exception e) {
                return true; // Angular not present
            }
        });
    }

    public static void sleep(int seconds) {
        try {
            Thread.sleep(seconds * 1000L);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Sleep interrupted", e);
        }
    }

    public static boolean waitForElementToBePresent(WebDriver driver, By locator) {
        try {
            getWait(driver).until(ExpectedConditions.presenceOfElementLocated(locator));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public static void waitForUrl(WebDriver driver, String expectedUrl) {
        getWait(driver).until(ExpectedConditions.urlToBe(expectedUrl));
    }

    public static void waitForUrlContains(WebDriver driver, String urlFragment) {
        getWait(driver).until(ExpectedConditions.urlContains(urlFragment));
    }
}