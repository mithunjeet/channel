#include <iostream>
#include <vector>

using namespace std;

void helper(int row, int col, vector<string>& grid1, vector<string>& grid2, bool& flag) {
    if (row < 0 || col < 0 || row >= grid2.size() || col >= grid2[0].size()) {
        return;
    }

    if (grid2[row][col] == '0') return;

    if (grid2[row][col] == '1') {
        if (grid1[row][col] == '0') {
            flag = false;
        }
        grid2[row][col] = '0';  
    }

    helper(row + 1, col, grid1, grid2, flag);
    helper(row - 1, col, grid1, grid2, flag);
    helper(row, col + 1, grid1, grid2, flag);
    helper(row, col - 1, grid1, grid2, flag);
}

int main() {
    vector<string> grid1 = {"111", "100", "100"};
    vector<string> grid2 = {"111", "100", "101"};
    int count = 0;

    for (int i = 0; i < grid2.size(); i++) {
        for (int j = 0; j < grid2[i].size(); j++) {
            if (grid2[i][j] == '1') {
                bool flag = true;
                helper(i, j, grid1, grid2, flag);
                if (flag)
                    count++;
            }
        }
    }

    cout << "answer : " << count << endl;
    return 0;
}