package com.devjobs.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class SignUpPage extends BasePage {

    @FindBy(xpath = "//h2[text()='Create an account']")
    private WebElement createAccountHeading;

    @FindBy(xpath = "//h2[text()='Create an employer account']")
    private WebElement createEmployerAccountHeading;

    // User Type Selection
    @FindBy(xpath = "//button[normalize-space()='Job seeker']")
    private WebElement jobSeekerButton;

    @FindBy(xpath = "//button[normalize-space()='Employer']")
    private WebElement employerButton;

    // Job Seeker Form Fields
    @FindBy(xpath = "//input[@placeholder='Enter your full name']")
    private WebElement fullNameInput;

    @FindBy(xpath = "//input[@placeholder='Enter your username']")
    private WebElement usernameInput;

    @FindBy(xpath = "//input[@placeholder='Enter your email']")
    private WebElement emailInput;

    @FindBy(xpath = "//input[@placeholder='Enter your password']")
    private WebElement passwordInput;

    // Employer Form Fields
    @FindBy(xpath = "//input[@placeholder='Enter your company name']")
    private WebElement companyNameInput;

    @FindBy(xpath = "//input[@placeholder='Enter your company email']")
    private WebElement companyEmailInput;

    // Form Labels
    @FindBy(xpath = "//label[text()='Full name']")
    private WebElement fullNameLabel;

    @FindBy(xpath = "//label[text()='Username']")
    private WebElement usernameLabel;

    @FindBy(xpath = "//label[text()='Email address']")
    private WebElement emailLabel;

    @FindBy(xpath = "//label[text()='Password']")
    private WebElement passwordLabel;

    @FindBy(xpath = "//label[text()='Company name']")
    private WebElement companyNameLabel;

    @FindBy(xpath = "//label[text()='Company email address']")
    private WebElement companyEmailLabel;

    // Submit Button
    @FindBy(xpath = "//button[text()='Sign up']")
    private WebElement signUpSubmitButton;

    // Tips section elements (same as login page)
    @FindBy(xpath = "//div[@class='text'][normalize-space()='Tailor your application with a custom cover letter and resume.']")
    private WebElement tip1;

    @FindBy(xpath = "//div[@class='text'][normalize-space()='Use filters to narrow results by location, salary, job type, and more.']")
    private WebElement tip2;

    @FindBy(xpath = "//div[@class='text'][normalize-space()='Search anytime without logging in, but applying requires an account.']")
    private WebElement tip3;


    // Employer specific tips
    @FindBy(xpath = "//p[contains(text(), 'Enter the full legal name')]")
    private WebElement employerTip1;

    @FindBy(xpath = "//p[contains(text(), 'Provide a contact number')]")
    private WebElement employerTip2;

    @FindBy(xpath = "//p[contains(text(), 'Tell us how many employees')]")
    private WebElement employerTip3;

    @FindBy(xpath = "//p[contains(text(), 'Providing accurate company')]")
    private WebElement employerTip4;

    public SignUpPage(WebDriver driver) {
        super(driver);
    }

    // Verification Methods
    public boolean isJobSeekerSignUpFormVisible() {
        return createAccountHeading.isDisplayed() &&
                fullNameInput.isDisplayed() &&
                usernameInput.isDisplayed() &&
                emailInput.isDisplayed() &&
                passwordInput.isDisplayed() &&
                signUpSubmitButton.isDisplayed();
    }

    public boolean isEmployerSignUpFormVisible() {
        return createEmployerAccountHeading.isDisplayed() &&
                companyNameInput.isDisplayed() &&
                usernameInput.isDisplayed() &&
                companyEmailInput.isDisplayed() &&
                passwordInput.isDisplayed() &&
                signUpSubmitButton.isDisplayed();
    }

    public boolean areUserTypeButtonsVisible() {
        return jobSeekerButton.isDisplayed() && employerButton.isDisplayed();
    }

    public boolean areJobSeekerTipsVisible() {
        return tip1.isDisplayed() && tip2.isDisplayed() && tip3.isDisplayed(); //&& tip4.isDisplayed();
    }

    public boolean areEmployerTipsVisible() {
        return employerTip1.isDisplayed() && employerTip2.isDisplayed() &&
                employerTip3.isDisplayed() && employerTip4.isDisplayed();
    }

    public boolean areFormFieldsEmpty() {
        if (isJobSeekerFormActive()) {
            return fullNameInput.getAttribute("value").isEmpty() &&
                    usernameInput.getAttribute("value").isEmpty() &&
                    emailInput.getAttribute("value").isEmpty() &&
                    passwordInput.getAttribute("value").isEmpty();
        } else {
            return companyNameInput.getAttribute("value").isEmpty() &&
                    usernameInput.getAttribute("value").isEmpty() &&
                    companyEmailInput.getAttribute("value").isEmpty() &&
                    passwordInput.getAttribute("value").isEmpty();
        }
    }

    private boolean isJobSeekerFormActive() {
        try {
            return createAccountHeading.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    // Action Methods
    public void selectJobSeeker() {
        jobSeekerButton.click();
        logger.info("Selected Job Seeker user type");
    }

    public void selectEmployer() {
        employerButton.click();
        logger.info("Selected Employer user type");
    }

    public void fillJobSeekerForm(String fullName, String username, String email, String password) {
        fullNameInput.clear();
        fullNameInput.sendKeys(fullName);

        usernameInput.clear();
        usernameInput.sendKeys(username);

        emailInput.clear();
        emailInput.sendKeys(email);

        passwordInput.clear();
        passwordInput.sendKeys(password);

        logger.info("Filled job seeker form with: fullName={}, username={}, email={}",
                fullName, username, email);
    }

    public void fillEmployerForm(String companyName, String username, String email, String password) {
        companyNameInput.clear();
        companyNameInput.sendKeys(companyName);

        usernameInput.clear();
        usernameInput.sendKeys(username);

        companyEmailInput.clear();
        companyEmailInput.sendKeys(email);

        passwordInput.clear();
        passwordInput.sendKeys(password);

        logger.info("Filled employer form with: companyName={}, username={}, email={}",
                companyName, username, email);
    }

    public void clickSignUp() {
        signUpSubmitButton.click();
        logger.info("Clicked Sign Up button");
    }

    public void signUpAsJobSeeker(String fullName, String username, String email, String password) {
        selectJobSeeker();
        fillJobSeekerForm(fullName, username, email, password);
        clickSignUp();
    }

    public void signUpAsEmployer(String companyName, String username, String email, String password) {
        selectEmployer();
        fillEmployerForm(companyName, username, email, password);
        clickSignUp();
    }
}