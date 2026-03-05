#include <benchmark/benchmark.h>

#include <gflags/gflags.h>

#include <cpptrace/cpptrace.hpp>
#include <cpptrace/utils.hpp>
#include <glog/logging.h>

#include <csignal>
#include <iostream>

void signal_handler(int signal) {
  std::cerr << "Signal " << strsignal(signal) << " received." << std::endl;
  cpptrace::generate_trace(0).print_with_snippets(std::cerr);
  std::_Exit(128 + signal);
}

int main(int argc, char **argv) {
  FLAGS_logtostderr = 1;
  google::InitGoogleLogging(argv[0]);

  benchmark::Initialize(&argc, argv);

  // cpptrace::register_terminate_handler();

  std::signal(SIGTERM, signal_handler);
  std::signal(SIGSEGV, signal_handler);
  std::signal(SIGABRT, signal_handler);
  std::signal(SIGINT, signal_handler);
  std::signal(SIGFPE, signal_handler);

  benchmark::RunSpecifiedBenchmarks();
  return 0;
}
