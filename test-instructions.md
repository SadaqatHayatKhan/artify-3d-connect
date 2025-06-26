
# Selenium Test Suite for Artify 3D Gallery

## Overview
This test suite contains 10 automated test cases (5 positive, 5 negative) designed to test the Artify 3D Gallery web application using Selenium WebDriver with headless Chrome.

## Test Cases Summary

### Positive Test Cases (Happy Path)
1. **Homepage Load Test** - Verifies the homepage loads successfully
2. **Gallery Navigation Test** - Tests navigation to the gallery page
3. **Filter Buttons Display Test** - Checks if filter buttons are present
4. **Filter Functionality Test** - Tests filter button interactions
5. **Responsive Design Test** - Verifies page works on different screen sizes

### Negative Test Cases (Error Handling & Edge Cases)  
6. **Invalid URL Handling** - Tests behavior with non-existent pages
7. **Broken Image Handling** - Checks handling of missing images
8. **Form Validation** - Tests form input validation
9. **Slow Network Simulation** - Tests page loading under slow conditions
10. **JavaScript Error Detection** - Detects JavaScript console errors

## Technology Stack
- **Selenium WebDriver 4.15.0** - Browser automation
- **JUnit 5** - Test framework
- **Maven** - Build management
- **Chrome Headless** - Browser for testing
- **WebDriverManager** - Automatic driver management

## Test Environment Requirements
- Java 11+
- Maven 3.6+
- Chrome browser (headless mode)
- Docker (for containerized execution)

## Running Tests Locally
```bash
cd tests
mvn clean test
```

## Jenkins Integration
The tests are integrated into the Jenkins pipeline with the following stages:
1. **Clean Workspace** - Removes previous build artifacts
2. **Fetch Code** - Clones repository from GitHub
3. **Build Application** - Builds Docker containers
4. **Start Application** - Starts the web application
5. **Run Selenium Tests** - Executes all 10 test cases in headless Chrome
6. **Test Results Analysis** - Summarizes test execution results
7. **Cleanup** - Stops Docker containers

## Docker Integration
Tests run in a containerized environment using:
- `markhobson/maven-chrome:jdk-11` Docker image
- Includes Chrome, Maven, JDK, and ChromeDriver
- Configured for headless execution on AWS EC2

## Test Reports
- JUnit XML reports generated in `target/surefire-reports/`
- Test results archived in Jenkins for review
- Console output includes detailed pass/fail status for each test

## Database Integration
The application uses Supabase PostgreSQL database for:
- User authentication and profiles
- Artwork storage and metadata
- Gallery filtering and categorization

## Continuous Integration Benefits
- Automated testing on every code commit
- Early detection of regressions
- Consistent test environment across deployments
- Comprehensive coverage of UI functionality and error handling
