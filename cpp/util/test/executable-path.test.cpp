#include <gtest/gtest.h>

#include <iostream>
#include <v/get/executable-path>

using namespace v;

TEST(ExecutablePath, basic) {
	const auto &execPath = get::executablePath();

	// Print the path for manual verification
	std::cout << "Executable path: " << execPath << std::endl;
	std::cout << "Path length: " << execPath.numItems() << std::endl;

	// Basic checks
	EXPECT_GT(execPath.numItems(), 0);

	// The path should contain the test executable
	std::string pathStr(execPath); // Uses the explicit conversion operator
	EXPECT_TRUE(pathStr.length() > 0);

// Should be an absolute path on Linux
#ifdef __linux__
	EXPECT_TRUE(pathStr[0] == '/');
#endif

	// Should not contain null characters in the middle
	for (Size i = 0; i < execPath.numItems(); ++i) {
		EXPECT_NE(execPath[i], '\0');
	}
}
