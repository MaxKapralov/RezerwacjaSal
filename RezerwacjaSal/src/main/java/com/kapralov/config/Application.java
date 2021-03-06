package com.kapralov.config;

import java.util.Arrays;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.google.common.collect.ImmutableList;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;



@SpringBootApplication(scanBasePackages={"com.kapralov"})
@EnableJpaRepositories("com.kapralov.model")
@EntityScan(basePackages = {"com.kapralov.model"})
public class Application extends SpringBootServletInitializer{

	@Configuration
	  @Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
	  protected static class SecurityConfiguration extends WebSecurityConfigurerAdapter {
		
		@Autowired
		private DataSource dataSource;
		
		
		@Autowired
		public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception
		{
	    	auth.jdbcAuthentication().dataSource(dataSource)
	    	.passwordEncoder(passwordEncoder())
	    	.usersByUsernameQuery(
	    			"select login as username, password, 1 as enabled from users where login=?")
	    		.authoritiesByUsernameQuery(
	    			"select users.login as username, user_info.role as role from user_info join users on user_info.id_user = users.id_user where login=?");
		}
		
	    @Override
	    protected void configure(HttpSecurity http) throws Exception {
	      http
	        .httpBasic()
	      .and()
	        .authorizeRequests()
	        	.antMatchers("/", "/login", "/registration", "/loginIsUniq**").permitAll()
	        	.anyRequest().authenticated()
	      .and().logout()
	      .and().csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).requireCsrfProtectionMatcher(csrfProtectionMatcher(new String[]{"/user", "/login", "/", "/registration", "/logUser", "/loginIsUniq**"}))
	      .and().cors();
	    }
	    
	    private NoAntPathRequestMatcher csrfProtectionMatcher(String[] patterns) {
	        return new NoAntPathRequestMatcher(patterns);
	      }
	    
	    @Bean
	    public CorsConfigurationSource corsConfigurationSource() {
	        final CorsConfiguration configuration = new CorsConfiguration();
	        configuration.setAllowedOrigins(ImmutableList.of("*"));
	        configuration.setAllowedMethods(ImmutableList.of("HEAD",
	                "GET", "POST", "PUT", "DELETE", "PATCH"));
	        configuration.setAllowCredentials(true);
	        configuration.setAllowedHeaders(ImmutableList.of("Authorization", "Cache-Control", "Content-Type"));
	        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        source.registerCorsConfiguration("/**", configuration);
	        return source;
	    }
	    
	    @Override
	    public void configure(WebSecurity web) throws Exception {
	         web
	            .ignoring()
	            .antMatchers("/resources/**");
	    }
	    
	    @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }
	    
	  }
	
	
	protected SpringApplicationBuilder configure(SpringApplicationBuilder app)
	{
		return app.sources(Application.class);
	}
	
	
	public static void main(String[] args)
	{
		SpringApplication.run(Application.class, args);
	}
	
}
