FROM maven:3.9.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=builder /app/target/demo-0.0.1-SNAPSHOT.jar app.jar
ARG JWT_SECRET
ENV JWT_SECRET=${JWT_SECRET}
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]