package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Product struct {
	ID          uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Price       float64   `json:"price"`
	Image       string    `json:"image"`
	CategoryID  uuid.UUID `json:"categoryId"`
	Category    Category  `json:"category"`
	Rating      float64   `json:"rating"`
	Reviews     int       `json:"reviews"`
	Discount    float64   `json:"discount"`
	Stock       int       `json:"stock"`
	Colors      []string  `gorm:"type:text[]" json:"colors"`
	Sizes       []string  `gorm:"type:text[]" json:"sizes"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

func (p *Product) BeforeCreate(tx *gorm.DB) error {
	if p.ID == uuid.Nil {
		p.ID = uuid.New()
	}
	return nil
}