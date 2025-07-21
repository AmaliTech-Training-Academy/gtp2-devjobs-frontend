package com.devjobs.base;

import com.devjobs.config.ConfigManager;
import com.devjobs.utils.WebDriverManager;
import com.devjobs.utils.ScreenshotUtils;
import com.devjobs.utils.WaitUtils;
import org.testng.annotations.*;
import org.testng.ITestResult;
import io.qameta.allure.Attachment;
import io.qameta.allure.Step;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class BaseTest {
    protected static final Logger logger = LogManager.getLogger(BaseTest.class);
    protected ConfigManager config = ConfigManager.getInstance();

    @Parameters({"browser"})
    @BeforeMethod
    public void setUp(@Optional String browser) {
        logger.info("Setting up test with browser: {}", browser != null ? browser : config.getBrowser());

        WebDriverManager.setDriver(browser);
        logger.info("Navigating to: {}", config.getBaseUrl());
        WebDriverManager.getDriver().get(config.getBaseUrl());

        WaitUtils.waitForPageToLoad(WebDriverManager.getDriver());
        WaitUtils.sleep(5);

        logger.info("Page setup completed successfully");
    }

    @AfterMethod
    public void tearDown(ITestResult result) {
        String testName = result.getMethod().getMethodName();

        if (result.getStatus() == ITestResult.FAILURE) {
            logger.error("Test failed: {}", testName);

            // Capture screenshot for failure
            attachScreenshotOnFailure(testName);

            // Capture page source for debugging
            attachPageSourceOnFailure();

            // Log the failure details
            logFailureDetails(result);

        } else if (result.getStatus() == ITestResult.SUCCESS) {
            logger.info("Test passed: {}", testName);
        }

        WebDriverManager.quitDriver();
        logger.info("Test completed: {}", testName);
    }

    @Attachment(value = "Screenshot on Failure", type = "image/png")
    public byte[] attachScreenshotOnFailure(String testName) {
        try {
            String screenshotPath = ScreenshotUtils.takeScreenshot(
                    WebDriverManager.getDriver(),
                    testName + "_FAILURE"
            );
            logger.info("Failure screenshot captured: {}", screenshotPath);

            return java.nio.file.Files.readAllBytes(java.nio.file.Paths.get(screenshotPath));
        } catch (Exception e) {
            logger.error("Failed to capture failure screenshot", e);
            return new byte[0];
        }
    }

    @Attachment(value = "Page Source on Failure", type = "text/html")
    public String attachPageSourceOnFailure() {
        try {
            String pageSource = WebDriverManager.getDriver().getPageSource();
            logger.info("Page source captured for failure analysis");
            return pageSource;
        } catch (Exception e) {
            logger.error("Failed to capture page source", e);
            return "Failed to capture page source: " + e.getMessage();
        }
    }

    @Step("Capture screenshot for step: {stepName}")
    public void captureStepScreenshot(String stepName) {
        try {
            String screenshotPath = ScreenshotUtils.takeScreenshot(
                    WebDriverManager.getDriver(),
                    stepName
            );
            attachScreenshot(screenshotPath);
            logger.info("Step screenshot captured: {}", stepName);
        } catch (Exception e) {
            logger.error("Failed to capture step screenshot", e);
        }
    }

    @Attachment(value = "Step Screenshot", type = "image/png")
    private byte[] attachScreenshot(String screenshotPath) {
        try {
            return java.nio.file.Files.readAllBytes(java.nio.file.Paths.get(screenshotPath));
        } catch (Exception e) {
            logger.error("Failed to attach screenshot", e);
            return new byte[0];
        }
    }

    private void logFailureDetails(ITestResult result) {
        Throwable throwable = result.getThrowable();
        if (throwable != null) {
            logger.error("Failure cause: {}", throwable.getMessage());
            logger.error("Stack trace: ", throwable);

            // Attach error details to Allure
            attachErrorDetails(throwable);
        }
    }

    @Attachment(value = "Error Details", type = "text/plain")
    private String attachErrorDetails(Throwable throwable) {
        StringBuilder errorDetails = new StringBuilder();
        errorDetails.append("Error Message: ").append(throwable.getMessage()).append("\n\n");
        errorDetails.append("Exception Type: ").append(throwable.getClass().getSimpleName()).append("\n\n");
        errorDetails.append("Stack Trace:\n");

        for (StackTraceElement element : throwable.getStackTrace()) {
            errorDetails.append(element.toString()).append("\n");
        }

        return errorDetails.toString();
    }
}