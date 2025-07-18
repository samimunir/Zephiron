package main

import (
	"errors"
	"fmt"
)

func main() {
	fmt.Println("Functions & Loops in Go")
	printMe()
	greetMe("Sami Munir")
	
	var numerator int = 5
	var denominator int = 0
	var result, remainder, err = intDivision(numerator, denominator)
	if err != nil {
		fmt.Printf("Error encountered: %v", err.Error())
	}
	fmt.Printf("\nintDivision(%v, %v): %v, and the remainder is %v.\n", numerator, denominator, result, remainder)
}

func printMe() {
	fmt.Println("\nHello world! > from printMe()")
}

func greetMe(name string) {
	fmt.Println("\nWelcome to go", name, "> from greetMe()")
}

func intDivision(numerator int, denominator int) (int, int, error) {
	var err error
	if denominator == 0 {
		err = errors.New("Cannot divide by Zero.")
		return 0, 0, err
	}
	var result int = numerator / denominator
	var remainder int = numerator % denominator
	return result, remainder, err
}