package com.devjobs.pages;

import com.devjobs.utils.WaitUtils;
import com.devjobs.utils.ScreenshotUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.PageFactory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public abstract class BasePage {
    protected WebDriver driver;
    protected Actions actions;
    protected static final Logger logger = LogManager.getLogger(BasePage.class);

    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.actions = new Actions(driver);
        PageFactory.initElements(driver, this);
    }

    protected WebElement waitForVisibility(By locator) {
        return WaitUtils.waitForVisibility(driver, locator);
    }

    protected WebElement waitForClickability(By locator) {
        return WaitUtils.waitForClickability(driver, locator);
    }

    protected void clickElement(By locator) {
        WebElement element = waitForClickability(locator);
        element.click();
        logger.info("Clicked element: " + locator);
    }

    protected void enterText(By locator, String text) {
        WebElement element = waitForVisibility(locator);
        element.clear();
        element.sendKeys(text);
        logger.info("Entered text '{}' in element: {}", text, locator);
    }

    protected String getText(By locator) {
        WebElement element = waitForVisibility(locator);
        return element.getText();
    }

    protected boolean isElementVisible(By locator) {
        try {
            waitForVisibility(locator);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    protected void scrollToElement(By locator) {
        WebElement element = driver.findElement(locator);
        actions.moveToElement(element).perform();
    }

    public String takeScreenshot(String testName) {
        return ScreenshotUtils.takeScreenshot(driver, testName);
    }

    protected boolean isElementPresent(By locator) {
        try {
            driver.findElement(locator);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    protected void waitForPageStabilization() {
        WaitUtils.sleep(2);
        WaitUtils.waitForPageToLoad(driver);
    }
}