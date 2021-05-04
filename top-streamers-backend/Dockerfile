FROM zenika/kotlin:1.1.61-jdk12-alpine
COPY build/libs/top-streamers-0.0.1.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
EXPOSE 8080