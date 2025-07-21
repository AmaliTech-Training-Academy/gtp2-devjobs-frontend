package com.devjobs.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import java.io.File;
import java.io.IOException;

public class TestDataManager {
    private static final String TEST_DATA_PATH = "src/test/resources/testdata/";
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static JsonNode getTestData(String fileName) {
        try {
            File file = new File(TEST_DATA_PATH + fileName);
            return objectMapper.readTree(file);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load test data from: " + fileName, e);
        }
    }

    public static UserData getJobSeekerData() {
        JsonNode data = getTestData("jobseeker_data.json");
        return UserData.builder()
                .fullName(data.get("fullName").asText())
                .username(data.get("username").asText())
                .email(data.get("email").asText())
                .password(data.get("password").asText())
                .build();
    }

    public static UserData getEmployerData() {
        JsonNode data = getTestData("employer_data.json");
        return UserData.builder()
                .companyName(data.get("companyName").asText())
                .username(data.get("username").asText())
                .email(data.get("email").asText())
                .password(data.get("password").asText())
                .build();
    }

    public static UserData getLoginData() {
        JsonNode data = getTestData("login_data.json");
        return UserData.builder()
                .email(data.get("email").asText())
                .password(data.get("password").asText())
                .build();
    }
}