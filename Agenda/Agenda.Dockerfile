FROM openjdk:23
COPY target/Agenda-0.0.1-SNAPSHOT.jar /agendaapp.jar
CMD ["java", "-jar", "/agendaapp.jar"]


