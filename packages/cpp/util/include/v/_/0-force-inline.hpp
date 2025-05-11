#pragma once

// Define FORCE_INLINE macro based on compiler
#if defined(_MSC_VER) // Microsoft Visual C++
	#define VOLTISO_FORCE_INLINE __forceinline inline
#elif defined(__GNUC__) || defined(__clang__) // GCC or Clang
	#define VOLTISO_FORCE_INLINE __attribute__((always_inline)) inline
// Note: Adding 'inline' keyword as well is good practice with the attribute
#else                                 // Other compilers
	#define VOLTISO_FORCE_INLINE inline // Fallback to standard inline hint
#endif
