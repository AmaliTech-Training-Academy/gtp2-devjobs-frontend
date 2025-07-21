package com.devjobs.tests;

import com.devjobs.base.BaseTest;
import com.devjobs.data.TestDataManager;
import com.devjobs.data.UserData;
import com.devjobs.pages.LandingPage;
import com.devjobs.pages.SignUpPage;
import com.devjobs.utils.WebDriverManager;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;
import io.qameta.allure.*;

@Epic("DevJobs Application")
@Feature("User Registration")
public class SignUpTest extends BaseTest {

    @Test(priority = 1)
    @Story("Sign Up Page User Type Selection")
    @Description("Verify user type selection functionality on sign up page")
    @Severity(SeverityLevel.CRITICAL)
    public void verifyUserTypeSelection() {
        LandingPage landingPage = new LandingPage(WebDriverManager.getDriver());
        SignUpPage signUpPage = landingPage.clickSignUpButton();

        SoftAssert softAssert = new SoftAssert();

        // Verify initial state (Job Seeker should be default)
        softAssert.assertTrue(signUpPage.areUserTypeButtonsVisible(), "User type buttons should be visible");
        softAssert.assertTrue(signUpPage.areJobSeekerTipsVisible(), "Job seeker tips should be visible by default");

        // Switch to Employer
        signUpPage.selectEmployer();
        softAssert.assertTrue(signUpPage.isEmployerSignUpFormVisible(), "Employer form should be visible");
        softAssert.assertTrue(signUpPage.areEmployerTipsVisible(), "Employer tips should be visible");

        // Switch back to Job Seeker
        signUpPage.selectJobSeeker();
        softAssert.assertTrue(signUpPage.isJobSeekerSignUpFormVisible(), "Job seeker form should be visible");
        softAssert.assertTrue(signUpPage.areJobSeekerTipsVisible(), "Job seeker tips should be visible");

        softAssert.assertAll();
        logger.info("User type selection verified successfully");
    }

    @Test(priority = 2)
    @Story("Job Seeker Registration Form")
    @Description("Verify job seeker registration form fields and validation")
    @Severity(SeverityLevel.CRITICAL)
    public void verifyJobSeekerRegistrationForm() {
        UserData jobSeekerData = TestDataManager.getJobSeekerData();

        LandingPage landingPage = new LandingPage(WebDriverManager.getDriver());
        SignUpPage signUpPage = landingPage.clickSignUpButton();

        SoftAssert softAssert = new SoftAssert();

        // Verify form is initially empty
        softAssert.assertTrue(signUpPage.areFormFieldsEmpty(), "Form fields should be initially empty");

        // Fill and verify job seeker form
        signUpPage.selectJobSeeker();
        signUpPage.fillJobSeekerForm(
                jobSeekerData.getFullName(),
                jobSeekerData.getUsername(),
                jobSeekerData.getEmail(),
                jobSeekerData.getPassword()
        );

        softAssert.assertTrue(signUpPage.isJobSeekerSignUpFormVisible(), "Job seeker form should be visible");

        softAssert.assertAll();
        logger.info("Job seeker registration form verified successfully");
    }

    @Test(priority = 3)
    @Story("Employer Registration Form")
    @Description("Verify employer registration form fields and validation")
    @Severity(SeverityLevel.CRITICAL)
    public void verifyEmployerRegistrationForm() {
        UserData employerData = TestDataManager.getEmployerData();

        LandingPage landingPage = new LandingPage(WebDriverManager.getDriver());
        SignUpPage signUpPage = landingPage.clickSignUpButton();

        SoftAssert softAssert = new SoftAssert();

        // Switch to employer and verify form
        signUpPage.selectEmployer();
        softAssert.assertTrue(signUpPage.isEmployerSignUpFormVisible(), "Employer form should be visible");
        softAssert.assertTrue(signUpPage.areFormFieldsEmpty(), "Form fields should be initially empty");

        // Fill employer form
        signUpPage.fillEmployerForm(
                employerData.getCompanyName(),
                employerData.getUsername(),
                employerData.getEmail(),
                employerData.getPassword()
        );

        softAssert.assertAll();
        logger.info("Employer registration form verified successfully");
    }

    @Test(priority = 4)
    @Story("Complete Job Seeker Registration")
    @Description("Complete the job seeker registration process")
    @Severity(SeverityLevel.NORMAL)
    public void completeJobSeekerRegistration() {
        UserData jobSeekerData = TestDataManager.getJobSeekerData();

        LandingPage landingPage = new LandingPage(WebDriverManager.getDriver());
        SignUpPage signUpPage = landingPage.clickSignUpButton();

        // Complete registration
        signUpPage.signUpAsJobSeeker(
                jobSeekerData.getFullName(),
                jobSeekerData.getUsername(),
                jobSeekerData.getEmail(),
                jobSeekerData.getPassword()
        );

        logger.info("Job seeker registration completed");
    }

    @Test(priority = 5)
    @Story("Complete Employer Registration")
    @Description("Complete the employer registration process")
    @Severity(SeverityLevel.NORMAL)
    public void completeEmployerRegistration() {
        UserData employerData = TestDataManager.getEmployerData();

        LandingPage landingPage = new LandingPage(WebDriverManager.getDriver());
        SignUpPage signUpPage = landingPage.clickSignUpButton();

        // Complete registration
        signUpPage.signUpAsEmployer(
                employerData.getCompanyName(),
                employerData.getUsername(),
                employerData.getEmail(),
                employerData.getPassword()
        );

        logger.info("Employer registration completed");
    }
}