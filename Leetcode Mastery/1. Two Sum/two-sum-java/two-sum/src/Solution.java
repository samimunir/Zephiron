import java.util.HashMap;

public class Solution {
    private int[] nums;
    private int target;

    public Solution() {}

    public Solution(int[] nums, int target) {
        this.nums = nums;
        this.target = target;
    }

    public void setNums(int[] nums) {
        this.nums = nums;
    }

    public int[] getNums() {
        return this.nums;
    }

    public void setTarget(int target) {
        this.target = target;
    }

    public int getTarget() {
        return this.target;
    }

    /*
     * Algorithm:
     * 
     * Runtime: 45ms
     * Memory: 44.96 MB
     */
    public int[] solutionOne(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[j] == complement && i != j) {
                    return new int[] {i, j};
                }
            }
        }
        return null;
    }

    /*
     * Algorithm:
     * 
     * Runtime: 5ms
     * Memory: 44.57 MB
     */
    public int[] solutionTwo(int[] nums, int target) {
        HashMap<Integer, Integer> numsMap = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            if (!numsMap.containsKey(nums[i])) {
                numsMap.put(nums[i], i);
            }
        }

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (numsMap.containsKey(complement) && numsMap.get(complement) != i) {
                return new int[] {i, numsMap.get(complement)};
            }
        }
        return null;
    }
}