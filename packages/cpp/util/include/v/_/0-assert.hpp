#pragma once
#include "v/_/0-console.hpp"
#include <v/_/0-namespace.hpp> // IWYU pragma: keep

#include <iostream>
#include <source_location>
#include <sstream>

namespace VOLTISO_NAMESPACE::_ {
struct AssertOpArg {
	bool condition;
	const std::string &lhs;
	const std::string &lhsEval;
	const std::string &opStr;
	const std::string &rhsEval;
	const std::string &rhs;
	std::source_location location;
	// DynamicString message;
}; // struct AssertOpArg

[[noreturn]] inline void assertFail(const AssertOpArg &arg) {
	std::string filePath = arg.location.file_name();
	auto lastSeparator = filePath.find_last_of("/\\"); // Find last '/' or '\\'
	std::string fileName = (lastSeparator == std::string::npos)
	                         ? filePath
	                         : filePath.substr(lastSeparator + 1);

	std::ostringstream oss;
	// format location
	// oss << console::FG_BLUE << console::UNDERLINE
	//     << console::HYPERLINK("vscode://file/" + filePath + ':' +
	//                               std::to_string(arg.location.line()),
	//                           fileName + ":" +
	//                               std::to_string(arg.location.line()))
	//     << console::RESET << " ";
	oss << console::FG_BLUE << filePath << ":" << arg.location.line()
	    << console::RESET << "\n";

	oss << "\t" << arg.location.function_name() << '\n';

	oss << "\t\t" << console::FG_GRAY(12) << arg.lhs << console::RESET << " "
	    << arg.lhsEval << " " << console::FG_RED << arg.opStr << console::RESET
	    << " " << arg.rhsEval << " " << console::FG_GRAY(12) << arg.rhs
	    << console::RESET << '\n';

	std::cerr << oss.str();
	std::cerr.flush();

	// throw std::runtime_error("assertion failed");
	std::abort();
	// std::unreachable();
}

template <class T> inline constexpr std::string stdStringFrom(const T &value) {
	if constexpr (std::is_same_v<T, std::string>) {
		return value;
		// } else if constexpr (std::is_constant_evaluated()) {
		// return "";
	} else if constexpr (std::is_same_v<T, const char *>) {
		return std::string(value);
	} else if constexpr (std::is_same_v<T, std::string_view>) {
		return std::string(value);
	} else if constexpr (requires { std::to_string(value); }) {
		return std::to_string(value);
	} else {
		std::ostringstream oss;
		oss << value;
		return oss.str();
	}
	return "";
} // stdStringFrom

} // namespace VOLTISO_NAMESPACE::_

#define VOLTISO_CMP(_a, _op, _b)                                               \
	if (std::is_constant_evaluated() || VOLTISO_NAMESPACE::IS_DEBUG_BUILD) {     \
		if (!((_a)_op(_b))) [[unlikely]] {                                         \
			if (std::is_constant_evaluated()) {                                      \
				static_assert(true, "assertion failed: " #_a " " #_op " " #_b);        \
			} else {                                                                 \
				VOLTISO_NAMESPACE::_::assertFail({                                     \
				  .condition = ((_a)_op(_b)),                                          \
				  .lhs = #_a,                                                          \
				  .lhsEval = VOLTISO_NAMESPACE::_::stdStringFrom(_a),                  \
				  .opStr = #_op,                                                       \
				  .rhsEval = VOLTISO_NAMESPACE::_::stdStringFrom(_b),                  \
				  .rhs = #_b,                                                          \
				  .location = std::source_location::current(),                         \
				});                                                                    \
			}                                                                        \
		}                                                                          \
	}

#define VOLTISO_EQ(a, b) VOLTISO_CMP(a, ==, b)
#define VOLTISO_NE(a, b) VOLTISO_CMP(a, !=, b)
#define VOLTISO_LT(a, b) VOLTISO_CMP(a, <, b)
#define VOLTISO_LE(a, b) VOLTISO_CMP(a, <=, b)
#define VOLTISO_GT(a, b) VOLTISO_CMP(a, >, b)
#define VOLTISO_GE(a, b) VOLTISO_CMP(a, >=, b)

#define VOLTISO_CHECK(a) VOLTISO_CMP(!!(a), ==, true)
#define VOLTISO_NOT(a) VOLTISO_CMP(!(a), ==, false)
