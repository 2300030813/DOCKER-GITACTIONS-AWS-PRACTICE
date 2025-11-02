//@Configuration
//public class CorsConfig {
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("*")  // ❌ This causes the error
//                        .allowedMethods("GET", "POST", "PUT", "DELETE")
//                        .allowCredentials(true);
//            }
//        };
//    }
//}
