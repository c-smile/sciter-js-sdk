# Alternative GNU Make workspace makefile autogenerated by Premake

ifndef config
  config=debug_x64
endif

ifndef verbose
  SILENT = @
endif

ifeq ($(config),debug_x64)
  usciter_config = debug_x64
  inspector_config = debug_x64
  integration_config = debug_x64
  sciter_sqlite_config = debug_x64
  glfw_opengl_config = debug_x64

else ifeq ($(config),debug_arm32)
  usciter_config = debug_arm32
  inspector_config = debug_arm32
  integration_config = debug_arm32
  sciter_sqlite_config = debug_arm32
  glfw_opengl_config = debug_arm32

else ifeq ($(config),release_x64)
  usciter_config = release_x64
  inspector_config = release_x64
  integration_config = release_x64
  sciter_sqlite_config = release_x64
  glfw_opengl_config = release_x64

else ifeq ($(config),release_arm32)
  usciter_config = release_arm32
  inspector_config = release_arm32
  integration_config = release_arm32
  sciter_sqlite_config = release_arm32
  glfw_opengl_config = release_arm32

else
  $(error "invalid configuration $(config)")
endif

PROJECTS := usciter inspector integration sciter-sqlite glfw-opengl

.PHONY: all clean help $(PROJECTS) 

all: $(PROJECTS)

usciter:
ifneq (,$(usciter_config))
	@echo "==== Building usciter ($(usciter_config)) ===="
	@${MAKE} --no-print-directory -C . -f usciter.make config=$(usciter_config)
endif

inspector:
ifneq (,$(inspector_config))
	@echo "==== Building inspector ($(inspector_config)) ===="
	@${MAKE} --no-print-directory -C . -f inspector.make config=$(inspector_config)
endif

integration:
ifneq (,$(integration_config))
	@echo "==== Building integration ($(integration_config)) ===="
	@${MAKE} --no-print-directory -C . -f integration.make config=$(integration_config)
endif

sciter-sqlite:
ifneq (,$(sciter_sqlite_config))
	@echo "==== Building sciter-sqlite ($(sciter_sqlite_config)) ===="
	@${MAKE} --no-print-directory -C . -f sciter-sqlite.make config=$(sciter_sqlite_config)
endif

glfw-opengl:
ifneq (,$(glfw_opengl_config))
	@echo "==== Building glfw-opengl ($(glfw_opengl_config)) ===="
	@${MAKE} --no-print-directory -C . -f glfw-opengl.make config=$(glfw_opengl_config)
endif

clean:
	@${MAKE} --no-print-directory -C . -f usciter.make clean
	@${MAKE} --no-print-directory -C . -f inspector.make clean
	@${MAKE} --no-print-directory -C . -f integration.make clean
	@${MAKE} --no-print-directory -C . -f sciter-sqlite.make clean
	@${MAKE} --no-print-directory -C . -f glfw-opengl.make clean

help:
	@echo "Usage: make [config=name] [target]"
	@echo ""
	@echo "CONFIGURATIONS:"
	@echo "  debug_x64"
	@echo "  debug_arm32"
	@echo "  release_x64"
	@echo "  release_arm32"
	@echo ""
	@echo "TARGETS:"
	@echo "   all (default)"
	@echo "   clean"
	@echo "   usciter"
	@echo "   inspector"
	@echo "   integration"
	@echo "   sciter-sqlite"
	@echo "   glfw-opengl"
	@echo ""
	@echo "For more information, see https://github.com/premake/premake-core/wiki"