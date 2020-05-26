OUTPUT				=	SteamSpeak

DOCKER				=	@docker
SH					=	@bash
RM					=	@/bin/rm -rf
export USE_CONTAINER ?= docker

# Begin OS detection
ifeq ($(OS),Windows_NT) # is Windows_NT on XP, 2000, 7, Vista, 10...
    export OPERATING_SYSTEM := Windows
    export DEFAULT_FEATURES = default-msvc
else
    export OPERATING_SYSTEM := $(shell uname)  # same as "uname -s"
    export DEFAULT_FEATURES = default
endif

AUTHOR				=	DalexHD
LAST_COMMIT_DATE	=	$(shell git log -1 --date=format:"%m/%d/%Y" --format="%ad   [%cr]")
LAST_COMMIT_HASH	=	$(shell git log -1 --date=format:"%m/%d/%y %T" --format="%H")
LAST_COMMIT_MESSAGE	=	$(shell git log -1 --date=format:"%m/%d/%y %T" --format="%s")
TEAMSPEAK_TOKEN		=	$(shell docker logs teamspeak 2>&1 | grep token | sed 's/.*token=//' | sed 's/\r//g' | head -1)
IP					=	$(shell ip addr sh $(ip route list default | grep -Po ' dev \K\w+') | grep -Po ' inet \K[\d.]+')

# Functions
disp_indent			=	for I in `seq 1 $(MAKELEVEL)`; do \
							test "$(MAKELEVEL)" '!=' '0' && printf "\t"; \
						done

disp_title			=	$(call disp_indent); \
						echo $(1)$(2) $(3) $(4) $(5) $(6) $(7) $(8) $(9) $(10)"\033[31m"; \
						$(2) $(3) $(4) $(5) $(6) $(7) $(8) $(9) $(10)

disp_title			=	$(call disp_indent); \
						echo "\033[38;5;$(2);m[  $(1) \#$(MAKELEVEL)  ]\033[0m"


################
##   COLORS   ##
################

Y					=	$(shell printf "\033[33m")
R					=	$(shell printf "\033[31m")
G					=	$(shell printf "\033[32m")
CYAN				=	$(shell printf "\033[36m")
B					=	$(shell printf "\033[34m")
X					=	$(shell printf "\033[0m")
UP					=	$(shell printf "\033[A")
CUT					=	$(shell printf "\033[K")
W					=	$(shell printf "\033[37m")
UND					=	$(shell printf "\033[4m")
BLINK				=	$(shell printf "\033[5m")
BOLD				=	$(shell printf "\033[1m")
UP					=	$(shell printf "\033[5A")

##@ Build
all:		## Build all files
			@make ts

##@ Help
help:		## View all available commands.
			$(shell $(TARGETS_EXE))
			@echo ${CYAN} Repository: ${UND}${BOLD}$(OUTPUT)${CYAN}${X}${CYAN}${UND}       Author: $(AUTHOR)${X}
			@echo ${CYAN} Last commit:${X}
			@echo ${CYAN} Date: $(LAST_COMMIT_DATE)
			@echo ${CYAN} Hash: $(LAST_COMMIT_HASH)${X}
			@echo ${CYAN} Message: $(LAST_COMMIT_MESSAGE)${X}
			@echo ${CYAN}--------------------------------------------------------------------------
			@echo ${CYAN} Available commands:
			@awk 'BEGIN {FS = ":.*##"; printf "Usage: make ${CYAN}<target>${X}\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  ${CYAN}%-25s${X} %s\n", $$1, $$2 } /^##@/ { printf "\n${BOLD}%s${X}\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
			@echo ${CYAN}--------------------------------------------------------------------------

TOKEN_SCRIPT = \
			$(bash echo "Waiting while servertoken is generated..." \
			while true; do \
				a = $(docker logs teamspeak 2>&1 | grep token | sed 's/.*token=//' | sed 's/\r//g' | head -1) \
				echo a \
				if [ ! -z a ]; then \
						break \
				fi \
			done)


##@ Misc

config:		## Create config files
			@if [ ! -d "packages/server/src/config/old.config" ]; then mkdir packages/server/src/config/old.config; fi
			@find packages/server/src/config -maxdepth 1 -iname \*.ts -not -iname \*.sawmple.ts -type f -exec bash -c 'for f; do cp "$$f" "packages/server/src/config/old.config/$$(basename $$f)"; done' sh {} +
			@echo ${B}Created a restore point inside the ${W}packages/server/src/config/old.config ${B}folder.${X}
			@find packages/server/src/config -maxdepth 1 -iname \*.sample.ts -type f -exec bash -c 'for f; do cp "$$f" "$${f/.sample}"; done' sh {} +
			@echo

check-ts:
			@scripts/check-ts.sh

check-config:
			@scripts/check-config.sh

plugin-tsconfig:
			@scripts/plugin-tsconfig.sh


re:			## Call clean => all
			@make clean
			@make all

##@ Development
release: 	## Release a new SteamSpeak version
			@make release-prepare
			@make generate CHECK_URLS=false

ts:			## Run docker image
			@echo ${B}Running: ${R}$(OUTPUT)${X}
			@echo
			$(DOCKER) run -d --name=teamspeak -p 9987:9987/udp -p 10011:10011/tcp -p 10022:10022/tcp -p 30033:30033/tcp -e TS3SERVER_LICENSE=accept -e TS3SERVER_QUERY_PROTOCOLS=raw,ssh -e TS3SERVER_IP_WHITELIST=whitelist.txt -e TS3SERVER_LOG_QUERY_COMMANDS=1 teamspeak ts3server serveradmin_password=SteamSpeak -v /docker/TeamSpeak/query_ip_whitelist.txt:/var/ts3server/whitelist.txt
			$(DOCKER) logs teamspeak 2>&1 | grep login | awk '{split($$0, i, ", "); print i[1]}' | tr -d '\t\r\" ' | cut -d "=" -f 2 | xargs -I {} echo "${B}Username: ${W}${BOLD}"{}${X}
			$(DOCKER) logs teamspeak 2>&1 | grep login | awk '{split($$0, i, ", "); print i[2]}' | tr -d '\t\r\" ' | cut -d "=" -f 2 | xargs -I {} echo "${B}Password: ${W}${BOLD}"{}${X}
			@echo
			@sleep 1
			$(DOCKER) logs teamspeak 2>&1 | grep token | sed 's/.*token=//' | sed 's/\r//g' | head -1 | tr -d '\n" ' | xargs -I {} echo "${B}Token: ${G}${BOLD}"{}${X}
			@echo ${B}IP: ${G}${BOLD}$(IP)${X}
			@echo

clean:		## Clean docker image
			@echo ${B}Stoping container...${X}
			$(DOCKER) stop teamspeak > /dev/null 2>&1
			$(DOCKER) rm teamspeak -f  > /dev/null 2>&1
			@echo ${B}Stoping container...${X}

##@ Releasing
release-prepare: ## Prepares the release with metadata and highlights
			@scripts/run.sh checker scripts/release-prepare.rb

check-generate: ## Checks for pending `make generate` changes
			@scripts/run.sh checker scripts/check-generate.sh

export CHECK_URLS ?= true
generate: ## Generates files across the repo using the data in /.meta
			@scripts/run.sh checker scripts/generate.rb

.PHONY:		all build clean re
