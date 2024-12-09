#include <csignal>

#include <cpptrace/cpptrace.hpp>
#include <glog/logging.h>
#include <gtest/gtest.h>

// auto originalPid = getpid();

void signal_handler(int signal) {
  std::cerr << "Signal " << strsignal(signal) << " received." << std::endl;
  cpptrace::generate_trace(0).print_with_snippets(std::cerr);
  std::_Exit(128 + signal);
}

int main(int argc, char *argv[]) {
  FLAGS_logtostderr = 1;
  google::InitGoogleLogging(argv[0]);
  testing::InitGoogleTest(&argc, argv);

  // cpptrace::register_terminate_handler();

  // std::signal(SIGTERM, signal_handler);
  // std::signal(SIGSEGV, signal_handler);
  // std::signal(SIGABRT, signal_handler);
  // std::signal(SIGINT, signal_handler);
  // std::signal(SIGFPE, signal_handler);

  return RUN_ALL_TESTS();
}
