#pragma once
#include "v/_/0-namespace.hpp" // IWYU pragma: keep

#include <format> // Required for std::format (C++20)
#include <string> // Required for std::string
// If C++20 is not available, you might need to use snprintf or other formatting
// methods.
#include <cstdint>   // Required for uint8_t
#include <stdexcept> // Required for std::out_of_range

// Note: The effectiveness of these codes depends on the terminal emulator
// supporting ANSI escape sequences. 256-color, true-color, hyperlinks, and
// other advanced features require specific terminal support.

namespace VOLTISO_NAMESPACE::console {

// --- Reset ---
constexpr auto RESET = "\033[0m"; // Resets all attributes

// --- Standard Foreground Colors (30-37) ---
constexpr auto FG_BLACK = "\033[30m";
constexpr auto FG_RED = "\033[31m";
constexpr auto FG_GREEN = "\033[32m";
constexpr auto FG_YELLOW = "\033[33m";
constexpr auto FG_BLUE = "\033[34m";
constexpr auto FG_MAGENTA = "\033[35m";
constexpr auto FG_CYAN = "\033[36m";
constexpr auto FG_WHITE = "\033[37m";
constexpr auto FG_DEFAULT = "\033[39m";

// --- Bright/Intense Foreground Colors (90-97) ---
constexpr auto FG_BRIGHT_BLACK = "\033[90m"; // Often Gray
constexpr auto FG_BRIGHT_RED = "\033[91m";
constexpr auto FG_BRIGHT_GREEN = "\033[92m";
constexpr auto FG_BRIGHT_YELLOW = "\033[93m";
constexpr auto FG_BRIGHT_BLUE = "\033[94m";
constexpr auto FG_BRIGHT_MAGENTA = "\033[95m";
constexpr auto FG_BRIGHT_CYAN = "\033[96m";
constexpr auto FG_BRIGHT_WHITE = "\033[97m";

// --- Standard Background Colors (40-47) ---
constexpr auto BG_BLACK = "\033[40m";
constexpr auto BG_RED = "\033[41m";
constexpr auto BG_GREEN = "\033[42m";
constexpr auto BG_YELLOW = "\033[43m";
constexpr auto BG_BLUE = "\033[44m";
constexpr auto BG_MAGENTA = "\033[45m";
constexpr auto BG_CYAN = "\033[46m";
constexpr auto BG_WHITE = "\033[47m";
constexpr auto BG_DEFAULT = "\033[49m";

// --- Bright/Intense Background Colors (100-107) ---
constexpr auto BG_BRIGHT_BLACK = "\033[100m"; // Often Gray
constexpr auto BG_BRIGHT_RED = "\033[101m";
constexpr auto BG_BRIGHT_GREEN = "\033[102m";
constexpr auto BG_BRIGHT_YELLOW = "\033[103m";
constexpr auto BG_BRIGHT_BLUE = "\033[104m";
constexpr auto BG_BRIGHT_MAGENTA = "\033[105m";
constexpr auto BG_BRIGHT_CYAN = "\033[106m";
constexpr auto BG_BRIGHT_WHITE = "\033[107m";

// --- Indexed Colors (256-color mode) ---
// Requires terminal support for 256 colors.

/**
 * @brief Returns the ANSI escape code for a foreground color from the 256-color
 * palette.
 * @param index Color index (0-255).
 * @return std::string ANSI escape code.
 * @throws std::out_of_range if index is not between 0 and 255.
 */
inline std::string FG_INDEX(uint8_t index) {
	// No range check needed as uint8_t naturally covers 0-255
	return std::format("\033[38;5;{}m", index);
}

/**
 * @brief Returns the ANSI escape code for a background color from the 256-color
 * palette.
 * @param index Color index (0-255).
 * @return std::string ANSI escape code.
 * @throws std::out_of_range if index is not between 0 and 255.
 */
inline std::string BG_INDEX(uint8_t index) {
	// No range check needed as uint8_t naturally covers 0-255
	return std::format("\033[48;5;{}m", index);
}

// --- Grayscale Colors (Subset of 256-color mode) ---
// Grayscale ramp is typically indices 232 (near black) to 255 (near white).

/**
 * @brief Returns the ANSI escape code for a foreground grayscale color
 * (256-color mode).
 * @param level Grayscale level from 1 (darkest) to 24 (lightest).
 * @return std::string ANSI escape code.
 * @throws std::out_of_range if level is not between 1 and 24.
 */
inline std::string FG_GRAY(int level) {
	if (level < 1 || level > 24) {
		throw std::out_of_range("Grayscale level must be between 1 and 24.");
	}
	// ANSI grayscale indices are 232 to 255
	return FG_INDEX(static_cast<uint8_t>(231 + level));
}

/**
 * @brief Returns the ANSI escape code for a background grayscale color
 * (256-color mode).
 * @param level Grayscale level from 1 (darkest) to 24 (lightest).
 * @return std::string ANSI escape code.
 * @throws std::out_of_range if level is not between 1 and 24.
 */
inline std::string BG_GRAY(int level) {
	if (level < 1 || level > 24) {
		throw std::out_of_range("Grayscale level must be between 1 and 24.");
	}
	// ANSI grayscale indices are 232 to 255
	return BG_INDEX(static_cast<uint8_t>(231 + level));
}

// --- True Color (24-bit RGB) ---
// Requires terminal support for true color.

/**
 * @brief Returns the ANSI escape code for a foreground true color (RGB).
 * @param r Red component (0-255).
 * @param g Green component (0-255).
 * @param b Blue component (0-255).
 * @return std::string ANSI escape code.
 */
inline std::string FG_RGB(uint8_t r, uint8_t g, uint8_t b) {
	return std::format("\033[38;2;{};{};{}m", r, g, b);
}

/**
 * @brief Returns the ANSI escape code for a background true color (RGB).
 * @param r Red component (0-255).
 * @param g Green component (0-255).
 * @param b Blue component (0-255).
 * @return std::string ANSI escape code.
 */
inline std::string BG_RGB(uint8_t r, uint8_t g, uint8_t b) {
	return std::format("\033[48;2;{};{};{}m", r, g, b);
}

// --- Text Formatting Attributes ---
constexpr auto BOLD = "\033[1m";   // Increases intensity
constexpr auto FAINT = "\033[2m";  // Decreases intensity (not widely supported)
constexpr auto ITALIC = "\033[3m"; // Not widely supported
constexpr auto UNDERLINE = "\033[4m";
constexpr auto BLINK_SLOW = "\033[5m"; // Less than 150 per minute
constexpr auto BLINK_RAPID =
  "\033[6m"; // MS-DOS ANSI.SYS; 150+ per minute; not widely supported
constexpr auto REVERSE = "\033[7m"; // Swaps foreground and background colors
constexpr auto CONCEAL = "\033[8m"; // Hides text (not widely supported)
constexpr auto STRIKETHROUGH = "\033[9m"; // Not widely supported

// --- Attribute Resets ---
// Reset specific attributes without affecting others (unlike RESET).
constexpr auto RESET_BOLD_FAINT = "\033[22m";    // Resets Bold and Faint
constexpr auto RESET_ITALIC = "\033[23m";        // Resets Italic
constexpr auto RESET_UNDERLINE = "\033[24m";     // Resets Underline
constexpr auto RESET_BLINK = "\033[25m";         // Resets Blink
constexpr auto RESET_REVERSE = "\033[27m";       // Resets Reverse
constexpr auto RESET_CONCEAL = "\033[28m";       // Resets Conceal
constexpr auto RESET_STRIKETHROUGH = "\033[29m"; // Resets Strikethrough

// --- Cursor Control ---

/**
 * @brief Returns the ANSI escape code to move the cursor up by n lines.
 * @param n Number of lines to move up.
 * @return std::string ANSI escape code.
 */
inline std::string CURSOR_UP(int n) { return std::format("\033[{}A", n); }

/**
 * @brief Returns the ANSI escape code to move the cursor down by n lines.
 * @param n Number of lines to move down.
 * @return std::string ANSI escape code.
 */
inline std::string CURSOR_DOWN(int n) { return std::format("\033[{}B", n); }

/**
 * @brief Returns the ANSI escape code to move the cursor forward (right) by n
 * columns.
 * @param n Number of columns to move forward.
 * @return std::string ANSI escape code.
 */
inline std::string CURSOR_FORWARD(int n) { return std::format("\033[{}C", n); }

/**
 * @brief Returns the ANSI escape code to move the cursor backward (left) by n
 * columns.
 * @param n Number of columns to move backward.
 * @return std::string ANSI escape code.
 */
inline std::string CURSOR_BACKWARD(int n) { return std::format("\033[{}D", n); }

/**
 * @brief Returns the ANSI escape code to move the cursor to a specific row and
 * column.
 * @param r Row number (1-based).
 * @param c Column number (1-based).
 * @return std::string ANSI escape code.
 */
inline std::string CURSOR_POSITION(int r, int c) {
	return std::format("\033[{};{}H", r, c);
}

constexpr auto CURSOR_HOME = "\033[H";    // Move cursor to home (1,1)
constexpr auto CURSOR_SAVE = "\033[s";    // Save cursor position (SCO)
constexpr auto CURSOR_RESTORE = "\033[u"; // Restore cursor position (SCO)
// Alternative Save/Restore (DEC standard, might be more widely supported)
constexpr auto CURSOR_SAVE_DEC = "\0337";    // Save cursor position (DEC)
constexpr auto CURSOR_RESTORE_DEC = "\0338"; // Restore cursor position (DEC)

// --- Screen Clearing ---
constexpr auto CLEAR_SCREEN =
  "\033[2J"; // Clear entire screen, cursor position unchanged
constexpr auto CLEAR_SCREEN_DOWN = "\033[J"; // Clear screen from cursor down
constexpr auto CLEAR_SCREEN_UP = "\033[1J";  // Clear screen from cursor up
constexpr auto CLEAR_LINE = "\033[2K";       // Clear entire line
constexpr auto CLEAR_LINE_END = "\033[K";    // Clear line from cursor to end
constexpr auto CLEAR_LINE_START = "\033[1K"; // Clear line from start to cursor

// --- Alternative Screen Buffer ---
// Useful for full-screen applications to restore the previous screen state on
// exit.
constexpr auto ENABLE_ALT_BUFFER = "\033[?1049h";
constexpr auto DISABLE_ALT_BUFFER = "\033[?1049l";

// --- Window Title ---
// Sets the terminal window title (requires OSC support).

/**
 * @brief Returns the ANSI escape code to set the terminal window title.
 * @param title The desired window title.
 * @return std::string ANSI escape code.
 */
inline std::string SET_WINDOW_TITLE(const std::string &title) {
	// OSC (Operating System Command) sequence: \033]0;...\007 (BEL)
	return std::format("\033]0;{}\007", title);
}

// --- Hyperlinks ---
// Creates a clickable hyperlink in supported terminals (OSC 8).

/**
 * @brief Returns the ANSI escape codes to create a clickable hyperlink.
 * @param url The URL for the link.
 * @param text The visible text for the link.
 * @return std::string ANSI escape codes wrapping the link text.
 */
inline std::string HYPERLINK(const std::string &url, const std::string &text) {
	// OSC 8 sequence: \033]8;;<url>\007<text>\033]8;;\007
	return std::format("\033]8;;{}\007{}\033]8;;\007", url, text);
}

// --- Aliases from original request ---
// Note: Standard ANSI doesn't have a separate "Purple", it uses Magenta.
constexpr auto RED = FG_RED;
constexpr auto GREEN = FG_GREEN;
constexpr auto YELLOW = FG_YELLOW;
constexpr auto BLUE = FG_BLUE;
constexpr auto MAGENTA = FG_MAGENTA;
constexpr auto CYAN = FG_CYAN;
constexpr auto WHITE = FG_WHITE;
constexpr auto PURPLE = FG_MAGENTA; // Alias for Magenta

} // namespace VOLTISO_NAMESPACE::console
