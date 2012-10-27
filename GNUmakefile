.DEFAULT_GOAL := all
BEM := ./node_modules/.bin/bem
TESTS_DIRS ?= blocks

ifneq (,$(findstring B,$(MAKEFLAGS)))
BEM_FLAGS := --force
endif

%::
	$(if $(findstring GNUmakefile,$@),,$(BEM) make $@ $(BEM_FLAGS))

test:
    @if [ "$(shell ls -1R ${TESTS_DIRS} | grep --color=none '\.test\.js')" ]; then \
        TESTS_DIRS="$(TESTS_DIRS)" $(BEM) make tests > /dev/null;\
        phantomjs bem-bl/blocks-test/i-phantom/i-phantom.js tests/unit/unit.html;\
    fi

.PHONY: clean
clean::
	$(BEM) make -m clean
