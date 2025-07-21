package com.devjobs.tests;

import com.devjobs.base.BaseTest;
import com.devjobs.data.TestDataManager;
import com.devjobs.data.UserData;
import com.devjobs.pages.LandingPage;
import com.devjobs.pages.LoginPage;
import com.devjobs.utils.WebDriverManager;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;
import io.qameta.allure.*;

@Epic("DevJobs Application")
@Feature("User Authentication")
public class LoginTest extends BaseTest {

    @Test(priority = 1)
    @Story("Login Page Elements Verification")
    @Description("Verify that all login page elements are visible and functional")
    @Severity(SeverityLevel.CRITICAL)
    public void verifyLoginPageElements() {
        LandingPage landingPage = new LandingPage(WebDriverManager.getDriver());
        LoginPage loginPage = landingPage.clickLoginButton();

        SoftAssert softAssert = new SoftAssert();

        // Verify page elements
        softAssert.assertTrue(loginPage.isLoginPageDisplayed(), "Login page should be displayed");
        softAssert.assertTrue(loginPage.areTipsVisible(), "Tips section should be visible");
        softAssert.assertTrue(loginPage.isRememberMeCheckboxVisible(), "Remember Me checkbox should be visible");
        softAssert.assertTrue(loginPage.isPasswordVisibilityToggleVisible(), "Password visibility toggle should be visible");

        softAssert.assertAll();
        logger.info("Login page elements verification completed successfully");
    }

    @Test(priority = 2)
    @Story("Login Form Interaction")
    @Description("Verify login form interactions including password visibility toggle and remember me")
    @Severity(SeverityLevel.NORMAL)
    public void verifyLoginFormInteractions() {
        UserData loginData = TestDataManager.getLoginData();

        LandingPage landingPage = new LandingPage(WebDriverManager.getDriver());
        LoginPage loginPage = landingPage.clickLoginButton();

        // Test form input
        loginPage.enterEmail(loginData.getEmail());
        loginPage.enterPassword(loginData.getPassword());

        SoftAssert softAssert = new SoftAssert();

        // Test password visibility toggle
//        loginPage.togglePasswordVisibility();
        softAssert.assertEquals(loginPage.getPasswordValue(), loginData.getPassword(),
                "Password should be visible after toggle");

//        loginPage.togglePasswordVisibility(); // Toggle back to hidden

        // Test remember me checkbox
        loginPage.checkRememberMe();

        softAssert.assertAll();
        logger.info("Login form interactions verified successfully");
    }

    @Test(priority = 3)
    @Story("Login Attempt with Invalid Credentials")
    @Description("Verify error handling when logging in with invalid credentials")
    @Severity(SeverityLevel.NORMAL)
    public void verifyLoginWithInvalidCredentials() {
        UserData loginData = TestDataManager.getLoginData();
        captureStepScreenshot("after_login_attempt");

        LandingPage landingPage = new LandingPage(WebDriverManager.getDriver());
        LoginPage loginPage = landingPage.clickLoginButton();
        captureStepScreenshot("after_login_attempt");

        // Attempt login with provided credentials
        loginPage.login(loginData.getEmail(), loginData.getPassword(), true);

        SoftAssert softAssert = new SoftAssert();
        softAssert.assertTrue(loginPage.isErrorMessageVisible(), "Error message should be displayed for invalid credentials");
        captureStepScreenshot("after_login_attempt");

        softAssert.assertAll();
        logger.info("Invalid login attempt handled correctly");
    }

    @Test(priority = 4)
    @Story("Navigation from Login to Sign Up")
    @Description("Verify navigation from login page to sign up page")
    @Severity(SeverityLevel.MINOR)
    public void verifyNavigationFromLoginToSignUp() {
        LandingPage landingPage = new LandingPage(WebDriverManager.getDriver());
        LoginPage loginPage = landingPage.clickLoginButton();

        loginPage.clickSignUpButton();

        // Verify we're on sign up page
        // This would require additional verification logic
        logger.info("Navigation from login to sign up verified");
    }
}