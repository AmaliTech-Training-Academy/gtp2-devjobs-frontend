package com.devjobs.utils;

import com.devjobs.config.ConfigManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;

public class WebDriverManager {
    private static ThreadLocal<WebDriver> driverThreadLocal = new ThreadLocal<>();
    private static ConfigManager config = ConfigManager.getInstance();

    public static void setDriver(String browserName) {
        if (browserName == null) {
            browserName = config.getBrowser();
        }

        WebDriver driver;

        switch (browserName.toLowerCase()) {
            case "chrome":
                io.github.bonigarcia.wdm.WebDriverManager.chromedriver().setup();
                ChromeOptions chromeOptions = new ChromeOptions();
                if (config.isHeadless()) {
                    chromeOptions.addArguments("--headless");
                }
                chromeOptions.addArguments("--no-sandbox");
                chromeOptions.addArguments("--disable-dev-shm-usage");
                chromeOptions.addArguments("--disable-extensions");
                chromeOptions.addArguments("--disable-gpu");
                driver = new ChromeDriver(chromeOptions);
                break;

            case "firefox":
                io.github.bonigarcia.wdm.WebDriverManager.firefoxdriver().setup();
                FirefoxOptions firefoxOptions = new FirefoxOptions();
                if (config.isHeadless()) {
                    firefoxOptions.addArguments("--headless");
                }
                driver = new FirefoxDriver(firefoxOptions);
                break;

            case "edge":
                io.github.bonigarcia.wdm.WebDriverManager.edgedriver().setup();
                EdgeOptions edgeOptions = new EdgeOptions();
                if (config.isHeadless()) {
                    edgeOptions.addArguments("--headless");
                }
                driver = new EdgeDriver(edgeOptions);
                break;

            default:
                throw new IllegalArgumentException("Browser not supported: " + browserName);
        }

        driver.manage().window().maximize();
        driverThreadLocal.set(driver);
    }

    public static WebDriver getDriver() {
        return driverThreadLocal.get();
    }

    public static void quitDriver() {
        WebDriver driver = driverThreadLocal.get();
        if (driver != null) {
            driver.quit();
            driverThreadLocal.remove();
        }
    }
}
