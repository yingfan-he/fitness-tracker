package com.example.fitness_tracker.model;

public enum MuscleGroup {
    CHEST("Push"),
    BACK("Pull"),
    BICEPS("Pull"),
    TRICEPS("Push"),
    SHOULDERS("Push"),
    LEGS("Legs"),
    CORE("Core");

    private final String category;

    private MuscleGroup(String category) {

        this.category = category;
    }

    public String getCategory() {
        return this.category;
    }

}
