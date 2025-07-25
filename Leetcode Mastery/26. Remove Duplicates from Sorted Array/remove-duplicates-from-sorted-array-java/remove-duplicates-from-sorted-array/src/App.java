/*
 * Leetcode #26 - Remove Duplicates from Sorted Array
 * > Java solution
 * 
 * Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kep the same. Then return the number of unique elements in nums.
 * 
 * Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:
 * - Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.
 * 
 * Return k.
 * 
 * Example 1:
 *  Input: nums = [1, 1, 2]
 *  Output: 2, nums = [1, 2, _]
 * 
 * Example 2:
 *  Input: nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
 *  Output: 5, nums = [0, 1, 2, 3, 4, _, _, _, _]
 */

import java.util.Arrays;

public class App {
    public static void main(String[] args) throws Exception {
        System.out.println("Leetcode #26 - Remove Duplicates from Sorted Array");
        System.out.println("--------------------------------------------------\n");

        Solution solution = new Solution();

        // Test Case 1
        int[] nums1 = {1, 1, 2};
        System.out.println("Test Case 1");
        System.out.println("Input: nums -> " + Arrays.toString(nums1));
        System.out.println("Output: " + solution.solutionOne(nums1));

        // Test Case 2
        int[] nums2 = {0, 0, 1, 1, 1, 2, 2, 3, 3, 4};
        System.out.println("\nTest Case 2");
        System.out.println("Input: nums -> " + Arrays.toString(nums2));
        System.out.println("Output: " + solution.solutionOne(nums2));

        // Test Case 3
        int[] nums3 = {1, 2};
        System.out.println("\nTest Case 3");
        System.out.println("Input: nums -> " + Arrays.toString(nums3));
        System.out.println("Output: " + solution.solutionOne(nums3));

        // Test Case 4
        int[] nums4 = {1};
        System.out.println("\nTest Case 4");
        System.out.println("Input: nums -> " + Arrays.toString(nums4));
        System.out.println("Output: " + solution.solutionOne(nums4));

        // Test Case 5
        int[] nums5 = {1, 1, 1, 1, 1, 1, 1};
        System.out.println("\nTest Case 5");
        System.out.println("Input: nums -> " + Arrays.toString(nums5));
        System.out.println("Output: " + solution.solutionOne(nums5));
    }
}
