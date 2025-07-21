package com.devjobs.tests;

import com.devjobs.base.BaseTest;
import com.devjobs.pages.LandingPage;
import com.devjobs.pages.LoginPage;
import com.devjobs.pages.SignUpPage;
import com.devjobs.utils.WebDriverManager;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;
import io.qameta.allure.*;

@Epic("DevJobs Application")
@Feature("Landing Page")
public class LandingPageTest extends BaseTest {

    @Test(priority = 1)
    @Story("Landing Page Layout Verification")
    @Description("Verify that all elements on the landing page are visible and properly displayed")
    @Severity(SeverityLevel.CRITICAL)
    public void verifyLandingPageLayout() {
        SoftAssert softAssert = new SoftAssert();
        LandingPage landingPage = new LandingPage(WebDriverManager.getDriver());

        // Verify header elements
        softAssert.assertTrue(landingPage.isDevJobsLogoVisible(), "DevJobs logo should be visible");
        softAssert.assertTrue(landingPage.isNavigationVisible(), "Navigation links should be visible");
        softAssert.assertTrue(landingPage.areAuthButtonsVisible(), "Login and Sign Up buttons should be visible");

        // Verify hero section
        softAssert.assertTrue(landingPage.isHeroSectionVisible(), "Hero section should be visible");

        // Verify What We Do section
        softAssert.assertTrue(landingPage.isWhatWeDoSectionVisible(), "What We Do section should be visible");

        // Verify growth section
        softAssert.assertTrue(landingPage.isGrowthSectionVisible(), "Growth section should be visible");

        // Verify job categories section
        softAssert.assertTrue(landingPage.isJobCategoriesSectionVisible(), "Job categories section should be visible");

        // Verify footer
        softAssert.assertTrue(landingPage.isFooterVisible(), "Footer should be visible");

        softAssert.assertAll();
        logger.info("Landing page layout verification completed successfully");
    }

    @Test(priority = 2)
    @Story("Navigation to Login Page")
    @Description("Verify navigation from landing page to login page via Login button")
    @Severity(SeverityLevel.NORMAL)
    public void verifyNavigationToLoginPage() {
        LandingPage landingPage = new LandingPage(WebDriverManager.getDriver());
        LoginPage loginPage = landingPage.clickLoginButton();

        SoftAssert softAssert = new SoftAssert();
        softAssert.assertTrue(loginPage.isLoginPageDisplayed(), "Login page should be displayed");
        softAssert.assertTrue(loginPage.areTipsVisible(), "Tips section should be visible on login page");

        softAssert.assertAll();
        logger.info("Navigation to login page verified successfully");
    }

    @Test(priority = 3)
    @Story("Navigation to Sign Up Page")
    @Description("Verify navigation from landing page to sign up page via Sign Up button")
    @Severity(SeverityLevel.NORMAL)
    public void verifyNavigationToSignUpPage() {
        LandingPage landingPage = new LandingPage(WebDriverManager.getDriver());
        SignUpPage signUpPage = landingPage.clickSignUpButton();

        SoftAssert softAssert = new SoftAssert();
        softAssert.assertTrue(signUpPage.areUserTypeButtonsVisible(), "User type selection buttons should be visible");
        softAssert.assertTrue(signUpPage.areJobSeekerTipsVisible(), "Job seeker tips should be visible by default");

        softAssert.assertAll();
        logger.info("Navigation to sign up page verified successfully");
    }

    @Test(priority = 4)
    @Story("Navigation to Employer Login")
    @Description("Verify navigation from landing page to login page via Employer link")
    @Severity(SeverityLevel.NORMAL)
    public void verifyNavigationToEmployerLogin() {
        LandingPage landingPage = new LandingPage(WebDriverManager.getDriver());
        LoginPage loginPage = landingPage.clickEmployerLink();

        SoftAssert softAssert = new SoftAssert();
        softAssert.assertTrue(loginPage.isLoginPageDisplayed(), "Login page should be displayed");
        softAssert.assertTrue(loginPage.areTipsVisible(), "Tips section should be visible on login page");

        softAssert.assertAll();
        logger.info("Navigation to employer login verified successfully");
    }
}