public class Solution {
    private String[] strs;
    
    public Solution() {}

    public Solution(String[] strs) {
        this.strs = strs;
    }

    public void setStrs(String[] strs) {
        this.strs = strs;
    }

    public String[] getStrs() {
        return this.strs;
    }

    private int shortestWordLen(String[] strs) {
        int shortestLength = Integer.MAX_VALUE;

        for (int i = 0; i < strs.length; i++) {
            if (strs[i].length() <= shortestLength) {
                shortestLength = strs[i].length();
            }
        }

        return shortestLength;
    }

    private String getShortestWord(String[] strs, int length) {
        for (int i = 0; i < strs.length; i++) {
            if (strs[i].length() == length) {
                return strs[i];
            }
        }

        return "";
    }

    /*
     * Algorithm:
     * 
     * Runtime: 3ms
     * Memory: 43.63 MB
     */
    public String solutionOne(String[] strs) {
        if (strs[0].equals("")) {
            return "";
        }

        String prefix = "";

        int shortestWordLength = shortestWordLen(strs);
        String shortestWord = getShortestWord(strs, shortestWordLength);

        boolean flag = true;
        int prefixSize = 1;

        while (flag) {
            if (prefixSize > shortestWordLength) {
                return prefix;
            }
            String currentPrefix = shortestWord.substring(0, prefixSize);

            for (int i = 0; i < strs.length; i++) {
                String strsPrefix = strs[i].substring(0, prefixSize);
                if (!strsPrefix.equals(currentPrefix)) {
                    flag = false;
                    return prefix;
                }
            }
            
            prefix = currentPrefix;
            prefixSize++;
        }

        return prefix;
    }
}