package com.devjobs.data;

public class UserData {
    private String fullName;
    private String username;
    private String email;
    private String password;
    private String companyName;

    // Private constructor for builder pattern
    private UserData(Builder builder) {
        this.fullName = builder.fullName;
        this.username = builder.username;
        this.email = builder.email;
        this.password = builder.password;
        this.companyName = builder.companyName;
    }

    // Getters
    public String getFullName() { return fullName; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getCompanyName() { return companyName; }

    // Builder pattern
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String fullName;
        private String username;
        private String email;
        private String password;
        private String companyName;

        public Builder fullName(String fullName) {
            this.fullName = fullName;
            return this;
        }

        public Builder username(String username) {
            this.username = username;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder password(String password) {
            this.password = password;
            return this;
        }

        public Builder companyName(String companyName) {
            this.companyName = companyName;
            return this;
        }

        public UserData build() {
            return new UserData(this);
        }
    }
}
