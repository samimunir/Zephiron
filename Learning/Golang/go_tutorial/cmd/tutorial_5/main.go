package main

import (
	"fmt"
	"strings"
)

func main() {
	fmt.Println("Tutorial 4")
	fmt.Println("---------------")

	var myString = "resume"
	var indexed = myString[0]
	fmt.Println("myString:", myString)
	fmt.Printf("indexed: %v | type: %T\n", indexed, indexed)
	for i, v := range myString {
		fmt.Println(i, v)
	}

	var myString2 = []rune("resume")
	var indexed2 = myString2[0]
	fmt.Println("\nmyString2:", myString2)
	fmt.Printf("indexed: %v | type: %T\n", indexed2, indexed2)
	for i, v := range myString2 {
		fmt.Println(i, v)
	}

	var myRune = '$'
	fmt.Println("\nmyRune:", myRune)

	var strSlice = []string {"s", "u", "b", "s", "c", "r", "i", "b", "e"}
	var catStr = ""
	for i := range strSlice {
		catStr += strSlice[i]
	}
	fmt.Printf("\ncatStr: %v\n", catStr)

	var strSlice2 = []string {"s", "u", "b", "s", "c", "r", "i", "b", "e"}
	var strBuilder strings.Builder
	for i := range strSlice2 {
		strBuilder.WriteString(strSlice2[i])
	}
	var catStr2 = strBuilder.String()
	fmt.Printf("\ncatStr2: %v\n", catStr2)
}