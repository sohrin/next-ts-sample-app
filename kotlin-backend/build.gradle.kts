import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.2.6.RELEASE"
	id("io.spring.dependency-management") version "1.0.9.RELEASE"
	kotlin("jvm") version "1.3.71"
	kotlin("plugin.spring") version "1.3.71"
	id("com.google.cloud.tools.jib") version "2.1.0"
}

group = "com.sanyu_i.sisdiv3.n_study.ntsa"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_1_8

val developmentOnly by configurations.creating
configurations {
	runtimeClasspath {
		extendsFrom(developmentOnly)
	}
}

repositories {
	mavenCentral()
}

dependencies {
	// Kotlin
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

	// Web
	implementation("org.springframework.boot:spring-boot-starter-web")

	// Database
	runtimeOnly("org.postgresql:postgresql")
	implementation("org.mybatis.spring.boot:mybatis-spring-boot-starter:2.1.2")
	implementation("org.flywaydb:flyway-core")

	// Security
	implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server")

	// Monitoring
	implementation("org.springframework.boot:spring-boot-starter-actuator")

	// Dev
	developmentOnly("org.springframework.boot:spring-boot-devtools")

	// Test
	testImplementation("org.springframework.boot:spring-boot-starter-test") {
		exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "1.8"
	}
}

jib {
	from {
		// MEMO: dockerizeのためシェルが実行できるイメージを選択
		image = "adoptopenjdk/openjdk11:alpine-slim"
	}
	to {
		image = (System.getenv("DOCKER_REGISTRY") ?: "") + "/" + "next-ts-sample-app_kotlin-backend" + (System.getenv("DOCKER_REPOSITORY_SUFFIX") ?: "") + "_no_dockerized"
	}
}