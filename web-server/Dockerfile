FROM ubuntu:24.04 AS builder

WORKDIR /app
RUN apt update -y && \
apt install -y openjdk-25-jdk

COPY . .
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests


FROM ubuntu:24.04

RUN apt update -y
RUN apt install -y openjdk-25-jre

COPY --from=builder /app/target/web-server-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]