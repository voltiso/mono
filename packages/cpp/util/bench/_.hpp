#pragma once

#include <benchmark/benchmark.h>

#define SEPARATOR                                                              \
	static bool once = true;                                                     \
	if (once) {                                                                  \
		once = false;                                                              \
		std::cout                                                                  \
		  << "-------------------------------------------------------------"       \
		     "-----------------------------------"                                 \
		  << std::endl;                                                            \
	}

#define NEWLINE                                                                \
	static bool once = true;                                                     \
	if (once) {                                                                  \
		once = false;                                                              \
		std::cout << std::endl;                                                    \
	}
