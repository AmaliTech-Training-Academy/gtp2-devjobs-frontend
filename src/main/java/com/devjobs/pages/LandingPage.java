package com.devjobs.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import java.util.List;

public class LandingPage extends BasePage {

    // Header Elements
    @FindBy(linkText = "devJobs")
    private WebElement devJobsLogo;

    @FindBy(linkText = "Home")
    private WebElement homeLink;

    @FindBy(linkText = "Start a Search")
    private WebElement startSearchLink;

    @FindBy(linkText = "Jobs List")
    private WebElement jobsListLink;

    @FindBy(linkText = "Salary Estimate")
    private WebElement salaryEstimateLink;

    @FindBy(linkText = "Employer?")
    private WebElement employerLink;

    @FindBy(xpath = "//button[text()='Login']")
    private WebElement loginButton;

    @FindBy(xpath = "//button[text()='Sign Up']")
    private WebElement signUpButton;

    // Hero Section
    @FindBy(xpath = "//h1[contains(text(), 'Find your')]")
    private WebElement heroHeading;

    @FindBy(xpath = "//p[contains(text(), 'Thousands of jobs in the')]")
    private WebElement heroSubtext;

    @FindBy(xpath = "//input[@placeholder='Filter by job title, companies, salary...']")
    private WebElement jobSearchInput;

    @FindBy(xpath = "//input[@placeholder='Enter location']")
    private WebElement locationInput;

    @FindBy(xpath = "//button[@type='submit']")
    private WebElement searchButton;

    // What We Do Section
    @FindBy(xpath = "//h2[text()='What We do']")
    private WebElement whatWeDoHeading;

    // Feature Cards
    @FindBy(xpath = "//h3[normalize-space()='Discover Your Dream Job']")
    private WebElement discoverJobCard;

    @FindBy(xpath = "//h3[normalize-space()='Easy Application']")
    private WebElement easyApplicationCard;

    @FindBy(xpath = "//h3[normalize-space()='Skill-Based Profiles']")
    private WebElement skillBasedProfilesCard;

    @FindBy(xpath = "//h3[normalize-space()='Post & Manage Jobs']")
    private WebElement postManageJobsCard;

    @FindBy(xpath = "//h3[normalize-space()='Find Top Talent']")
    private WebElement findTopTalentCard;

    @FindBy(xpath = "//h3[normalize-space()='Brand Your Listings']")
    private WebElement brandListingsCard;

    @FindBy(xpath = "//h3[normalize-space()='Secure & Role-Specific']")
    private WebElement secureRoleSpecificCard;

    @FindBy(xpath = "//h3[normalize-space()='Powerful Search']")
    private WebElement powerfulSearchCard;

    // Growth Section
    @FindBy(xpath = "//section[@class='cta-carousel']//h2[1]")
    private WebElement growthHeading;

    @FindBy(xpath = "//h3[normalize-space()='Practice with AI Interview Prep']")
    private WebElement aiInterviewPrepCard;

    @FindBy(xpath = "//h3[normalize-space()='Get Smart Feedback on your resume']")
    private WebElement smartFeedbackCard;

    @FindBy(xpath = "//h3[normalize-space()='Track Every Job you Apply to']")
    private WebElement trackJobsCard;

    // Job Categories Section
    @FindBy(xpath = "//h2[text()='Popular Job Categories']")
    private WebElement jobCategoriesHeading;

    @FindBy(xpath = "//img[@alt='Category image']")
    private List<WebElement> categoryImages;

    // Footer Elements
    @FindBy(xpath = "//h2[normalize-space()='Open Designers']")
    private WebElement openDesignersHeading;

    @FindBy(xpath = "//p[contains(text(), 'Open source is source code')]")
    private WebElement openSourceText;

    @FindBy(xpath = "//img[@alt='Discord']")
    private WebElement discordIcon;

    @FindBy(xpath = "//img[@alt='Instagram']")
    private WebElement instagramIcon;

    @FindBy(xpath = "//img[@alt='Facebook']")
    private WebElement facebookIcon;

    @FindBy(xpath = "//img[@alt='Twitter']")
    private WebElement twitterIcon;

    // Footer Links
    @FindBy(linkText = "Go Pro")
    private WebElement goProLink;

    @FindBy(linkText = "Explore Designs")
    private WebElement exploreDesignsLink;

    @FindBy(linkText = "Terms of Service")
    private WebElement termsOfServiceLink;

    public LandingPage(WebDriver driver) {
        super(driver);
    }

    // Verification Methods
    public boolean isDevJobsLogoVisible() {
        return devJobsLogo.isDisplayed();
    }

    public boolean isNavigationVisible() {
        return homeLink.isDisplayed() &&
                startSearchLink.isDisplayed() &&
                jobsListLink.isDisplayed() &&
                salaryEstimateLink.isDisplayed() &&
                employerLink.isDisplayed();
    }

    public boolean areAuthButtonsVisible() {
        return loginButton.isDisplayed() && signUpButton.isDisplayed();
    }

    public boolean isHeroSectionVisible() {
        return heroHeading.isDisplayed() &&
                heroSubtext.isDisplayed() &&
                jobSearchInput.isDisplayed() &&
                locationInput.isDisplayed() &&
                searchButton.isDisplayed();
    }

    public boolean isWhatWeDoSectionVisible() {
        return whatWeDoHeading.isDisplayed() &&
                discoverJobCard.isDisplayed() &&
                easyApplicationCard.isDisplayed() &&
                skillBasedProfilesCard.isDisplayed() &&
                postManageJobsCard.isDisplayed() &&
                findTopTalentCard.isDisplayed() &&
                brandListingsCard.isDisplayed() &&
                secureRoleSpecificCard.isDisplayed() &&
                powerfulSearchCard.isDisplayed();
    }

    public boolean isGrowthSectionVisible() {
        return growthHeading.isDisplayed() &&
                aiInterviewPrepCard.isDisplayed() &&
                smartFeedbackCard.isDisplayed() &&
                trackJobsCard.isDisplayed();
    }

    public boolean isJobCategoriesSectionVisible() {
        return jobCategoriesHeading.isDisplayed() && categoryImages.size() >= 3;
    }

    public boolean isFooterVisible() {
        return openDesignersHeading.isDisplayed() &&
                openSourceText.isDisplayed() &&
                discordIcon.isDisplayed() &&
                instagramIcon.isDisplayed() &&
                facebookIcon.isDisplayed() &&
                twitterIcon.isDisplayed() &&
                goProLink.isDisplayed() &&
                exploreDesignsLink.isDisplayed() &&
                termsOfServiceLink.isDisplayed();
    }

    // Action Methods
    public LoginPage clickLoginButton() {
        loginButton.click();
        logger.info("Clicked Login button");
        return new LoginPage(driver);
    }

    public SignUpPage clickSignUpButton() {
        signUpButton.click();
        logger.info("Clicked Sign Up button");
        return new SignUpPage(driver);
    }

    public LoginPage clickEmployerLink() {
        employerLink.click();
        logger.info("Clicked Employer link");
        return new LoginPage(driver);
    }

    public void performJobSearch(String jobTitle, String location) {
        jobSearchInput.clear();
        jobSearchInput.sendKeys(jobTitle);
        locationInput.clear();
        locationInput.sendKeys(location);
        searchButton.click();
        logger.info("Performed job search for: {} in {}", jobTitle, location);
    }
}