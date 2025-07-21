package com.devjobs.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class LoginPage extends BasePage {

    @FindBy(xpath = "//h3[normalize-space()='Login']")
    private WebElement loginHeading;

    @FindBy(xpath = "//input[@placeholder='Enter your email or username']")
    private WebElement emailUsernameInput;

    @FindBy(xpath = "//input[@placeholder='Enter your password']")
    private WebElement passwordInput;

    @FindBy(xpath = "//mat-icon[normalize-space()='visibility_off']")
    private WebElement passwordVisibilityToggle;

    @FindBy(xpath = "//input[@type='checkbox']")
    private WebElement rememberMeCheckbox;

    @FindBy(css = "button[type='submit'] span[class='mat-mdc-button-touch-target']")
    private WebElement loginSubmitButton;

    @FindBy(xpath = "//div[contains(text(), 'An error occurred')]")
    private WebElement errorMessage;

    @FindBy(xpath = "//button[text()='Sign Up']")
    private WebElement signUpButton;

    // Tips section elements
    @FindBy(xpath = "//div[@class='text'][normalize-space()='Tailor your application with a custom cover letter and resume.']")
    private WebElement tip1;

    @FindBy(xpath = "//div[@class='text'][normalize-space()='Use filters to narrow results by location, salary, job type, and more.']")
    private WebElement tip2;

    @FindBy(xpath = "//div[@class='text'][normalize-space()='Search anytime without logging in, but applying requires an account.']")
    private WebElement tip3;

    @FindBy(xpath = "//img[@alt='lamp-icon']")
    private WebElement lampIcon;

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    // Verification Methods
    public boolean isLoginPageDisplayed() {
        return loginHeading.isDisplayed() &&
                emailUsernameInput.isDisplayed() &&
                passwordInput.isDisplayed() &&
                loginSubmitButton.isDisplayed();
    }

    public boolean areTipsVisible() {
        return tip1.isDisplayed() &&
                tip2.isDisplayed() &&
                tip3.isDisplayed();
//                tip4.isDisplayed();
    }

    public boolean isErrorMessageVisible() {
        try {
            return errorMessage.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isRememberMeCheckboxVisible() {
        return rememberMeCheckbox.isDisplayed();
    }

    public boolean isPasswordVisibilityToggleVisible() {
        return passwordVisibilityToggle.isDisplayed();
    }

    // Action Methods
    public void enterEmail(String email) {
        emailUsernameInput.clear();
        emailUsernameInput.sendKeys(email);
        logger.info("Entered email: {}", email);
    }

    public void enterPassword(String password) {
        passwordInput.clear();
        passwordInput.sendKeys(password);
        logger.info("Entered password");
    }

    public void togglePasswordVisibility() {
        passwordVisibilityToggle.click();
        logger.info("Toggled password visibility");
    }

    public void checkRememberMe() {
        if (!rememberMeCheckbox.isSelected()) {
            rememberMeCheckbox.click();
            logger.info("Checked Remember Me checkbox");
        }
    }

    public void uncheckRememberMe() {
        if (rememberMeCheckbox.isSelected()) {
            rememberMeCheckbox.click();
            logger.info("Unchecked Remember Me checkbox");
        }
    }

    public void clickLogin() {
        loginSubmitButton.click();
        logger.info("Clicked Login button");
    }

    public SignUpPage clickSignUpButton() {
        signUpButton.click();
        logger.info("Clicked Sign Up button from login page");
        return new SignUpPage(driver);
    }

    public void login(String email, String password, boolean rememberMe) {
        enterEmail(email);
        enterPassword(password);
        if (rememberMe) {
            checkRememberMe();
        }
        clickLogin();
        logger.info("Performed login with email: {}, rememberMe: {}", email, rememberMe);
    }

    public String getPasswordValue() {
        return passwordInput.getAttribute("value");
    }
}