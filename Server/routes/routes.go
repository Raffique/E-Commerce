package routes

import (
	"shopease/controllers"
	"shopease/middleware"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRoutes(r *gin.Engine, db *gorm.DB) {
	// Controllers
	authController := controllers.NewAuthController(db)
	productController := controllers.NewProductController(db)

	// Public routes
	auth := r.Group("/api/auth")
	{
		auth.POST("/register", authController.Register)
		auth.POST("/login", authController.Login)
	}

	// Product routes
	products := r.Group("/api/products")
	{
		products.GET("", productController.List)
		products.GET("/:id", productController.Get)
	}

	// Protected routes
	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware())
	{
		// Admin routes
		admin := protected.Group("/admin")
		admin.Use(middleware.AdminMiddleware())
		{
			admin.POST("/products", productController.Create)
			admin.PUT("/products/:id", productController.Update)
			admin.DELETE("/products/:id", productController.Delete)
		}
	}
}