package main

import (
	"fmt"
	"unicode/utf8"
)

func main() {
	var intNum uint8 = 7
	fmt.Println("intNum:", intNum)
	fmt.Printf("type(intNum): %T\n", intNum)

	var floatNum float32 = 12345.678
	fmt.Println("\nfloatNum:", floatNum)
	fmt.Printf("type(floatNum): %T\n", floatNum)

	var name string = "Sami" + " " + "Munir"
	fmt.Println("\nname:", name)
	fmt.Printf("type(name): %T\n", name)
	fmt.Println("len(name):", len(name)) // bytes
	fmt.Println("# of chars in name:", utf8.RuneCountInString(name))

	var isPaid bool = false
	fmt.Println("\nisPaid:", isPaid)
	fmt.Printf("type(isPaid): %T\n", isPaid)

	var myVar = "text" // type is inferred
	fmt.Println("\nmyVar:", myVar)
	fmt.Printf("type(myVar): %T\n", myVar)

	myOtherVar := "Sami"
	fmt.Println("\nmyOtherVar:", myOtherVar)
	fmt.Printf("type(myOtherVar): %T\n", myOtherVar)

	const myConst string = "const value"
	fmt.Println("\nmyConst:", myConst)
	fmt.Printf("type(myConst): %T\n", myConst)

	const pi float32 = 3.1415
	fmt.Println("\npi:", pi)
	fmt.Printf("type(pi): %T\n", pi)
}