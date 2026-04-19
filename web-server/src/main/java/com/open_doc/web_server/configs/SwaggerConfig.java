package com.open_doc.web_server.configs;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

  @Bean
  public OpenAPI customOpenAPI() {
    // Define o esquema de segurança Bearer JWT
    SecurityScheme securityScheme = new SecurityScheme()
        .type(SecurityScheme.Type.HTTP)
        .scheme("bearer")
        .bearerFormat("JWT")
        .in(SecurityScheme.In.HEADER)
        .name("Authorization");

    // Aplica o esquema como requisito global
    SecurityRequirement securityRequirement = new SecurityRequirement().addList("BearerAuth");

    return new OpenAPI()
        .info(new Info()
            .title("Web Server API")
            .description("API Documentation")
            .version("v1.0"))
        .addSecurityItem(securityRequirement)
        .schemaRequirement("BearerAuth", securityScheme);
  }
}
