/*
 * Leetcode #14 - Longest Common Prefix
 * > Java solution
 * 
 * 
 * Write a function to find the longest common prefix string amongst an array of strings.
 * 
 * If there is no common prefix, return an empty string "".
 * 
 * Example 1:
 *  Input: strs =["flower", "flow", "flight"]
 *  Output: "fl"
 * 
 * Example 2:
 *  Input: strs = ["dog", "racecar", "car"]
 *  Output: ""
 */

import java.util.Arrays;

public class App {
    public static void main(String[] args) throws Exception {
        System.out.println("Leetcode #14 - Longest Common Prefix");
        System.out.println("-------------------------\n");

        Solution solution = new Solution();

        // Test Case 1
        String[] strs1 = {"flower", "flow", "flight"};
        System.out.println("Test Case 1");
        System.out.println("Input: strs -> " + Arrays.toString(strs1));
        System.out.println("Output: " + solution.solutionOne(strs1));

        // Test Case 2
        String[] strs2 = {"dog", "racecar", "car"};
        System.out.println("\nTest Case 2");
        System.out.println("Input: strs -> " + Arrays.toString(strs2));
        System.out.println("Output: " + solution.solutionOne(strs2));

        // Test Case 3
        String[] strs3 = {"dogend", "dogde", "dogand", "dogh", "dogand"};
        System.out.println("\nTest Case 3");
        System.out.println("Input: strs -> " + Arrays.toString(strs3));
        System.out.println("Output: " + solution.solutionOne(strs3));

        // Test Case 4
        String[] strs4 = {"flower", "flower", "flower", "flower", "flower"};
        System.out.println("\nTest Case 4");
        System.out.println("Input: strs -> " + Arrays.toString(strs4));
        System.out.println("Output: " + solution.solutionOne(strs4));

        // Test Case 5
        String[] strs5 = {"aa", "aab", "aac", "aab", "aab", "aab"};
        System.out.println("\nTest Case 5");
        System.out.println("Input: strs -> " + Arrays.toString(strs5));
        System.out.println("Output: " + solution.solutionOne(strs5));
    }
}
