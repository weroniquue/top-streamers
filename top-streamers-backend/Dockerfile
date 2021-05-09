FROM zenika/kotlin:1.4.20-jdk11
COPY build/libs/top-streamers-0.0.1.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
EXPOSE 8080