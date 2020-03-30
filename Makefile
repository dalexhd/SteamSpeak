OUTPUT							=	SteamSpeak

DOCKER							=	@docker
SH									=	@bash
RM									=	@/bin/rm -rf

AUTHOR							=	DalexHD
LAST_COMMIT_DATE		=	$(shell git log -1 --date=format:"%m/%d/%y %T" --format="%ad   [%cr]")
LAST_COMMIT_HASH		=	$(shell git log -1 --date=format:"%m/%d/%y %T" --format="%H")
LAST_COMMIT_MESSAGE	=	$(shell git log -1 --date=format:"%m/%d/%y %T" --format="%s")
TEAMSPEAK_TOKEN			=	$(shell docker logs teamspeak 2>&1 | grep token | sed 's/.*token=//' | sed 's/\r//g' | head -1)

# Functions
disp_indent					=	for I in `seq 1 $(MAKELEVEL)`; do \
												test "$(MAKELEVEL)" '!=' '0' && printf "\t"; \
											done

disp_title					=	$(call disp_indent); \
											echo $(1)$(2) $(3) $(4) $(5) $(6) $(7) $(8) $(9) $(10)"\033[31m"; \
											$(2) $(3) $(4) $(5) $(6) $(7) $(8) $(9) $(10)

disp_title					=	$(call disp_indent); \
											echo "\033[38;5;$(2);m[  $(1) \#$(MAKELEVEL)  ]\033[0m"


################
##   COLORS   ##
################

Y										=	$(shell printf "\033[33m")
R										=	$(shell printf "\033[31m")
G										=	$(shell printf "\033[32m")
CYAN								=	$(shell printf "\033[36m")
B										=	$(shell printf "\033[34m")
X										=	$(shell printf "\033[0m")
UP									=	$(shell printf "\033[A")
CUT									=	$(shell printf "\033[K")
W										=	$(shell printf "\033[37m")
UND									=	$(shell printf "\033[4m")
BLINK								=	$(shell printf "\033[5m")
BOLD								=	$(shell printf "\033[1m")
UP									=	$(shell printf "\033[5A")

NORM_COLOR					=	153
NORM_COLOR_T				=	141
NORM_COLOR_ERR			=	160
NORM_COLOR_WAR			=	214

all:		##@Build Build all files
			@make ts


TOKEN_SCRIPT = \
			$(bash echo "Waiting while servertoken is generated..." \
			while true; do \
				a = $(docker logs teamspeak 2>&1 | grep token | sed 's/.*token=//' | sed 's/\r//g' | head -1) \
				echo a \
				if [ ! -z a ]; then \
						break \
				fi \
			done)


ts:		##@Misc Run docker image
			@echo ${B}Running: ${R}$(OUTPUT)${X}
			@echo
			$(DOCKER) run -d --name=teamspeak -p 9987:9987/udp -p 10011:10011/tcp -p 10022:10022/tcp -p 30033:30033/tcp -e TS3SERVER_LICENSE=accept -e TS3SERVER_QUERY_PROTOCOLS=raw,ssh -e TS3SERVER_IP_WHITELIST=whitelist.txt -e TS3SERVER_LOG_QUERY_COMMANDS=1 teamspeak ts3server serveradmin_password=SteamSpeak -v /docker/TeamSpeak/query_ip_whitelist.txt:/var/ts3server/whitelist.txt > /dev/null 2>&1
			$(DOCKER) logs teamspeak 2>&1 | grep login | awk '{split($$0, i, ", "); print i[1]}' | tr -d '\t\r\" ' | cut -d "=" -f 2 | xargs -I {} echo "${B}Username: ${W}${BOLD}"{}${X}
			$(DOCKER) logs teamspeak 2>&1 | grep login | awk '{split($$0, i, ", "); print i[2]}' | tr -d '\t\r\" ' | cut -d "=" -f 2 | xargs -I {} echo "${B}Password: ${W}${BOLD}"{}${X}
			@echo
			@sleep 0.5
			$(DOCKER) logs teamspeak 2>&1 | grep token | sed 's/.*token=//' | sed 's/\r//g' | head -1 | tr -d '\n" ' | xargs -I {} echo "${B}Token: ${G}${BOLD}"{}${X}
			@echo

config:		##@Misc Create config files
			@mv src/backend/config/cache.sample.js src/backend/config/cache.js
			@mv src/backend/config/database.sample.js src/backend/config/database.js
			@mv src/backend/config/steam.sample.js src/backend/config/steam.js
			@mv src/backend/config/teamspeak.sample.js src/backend/config/teamspeak.js
			@echo

clean:		##@Misc Clean docker image
			@echo ${B}Stoping container...${X}
			$(DOCKER) stop teamspeak > /dev/null 2>&1
			$(DOCKER) system prune -f  > /dev/null 2>&1

HELP_SCRIPT = \
			while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^([a-zA-Z\-\%_]+)\s*:.*\#\#(?:@([a-zA-Z\-\%]+))?\s(.*)$$/ }; \
			for (sort keys %help) { \
				print " ${R}$$_:${RESET}\n"; \
				for (@{$$help{$$_}}) { \
					$$sep = " " x (32 - length $$_->[0]); \
					print "    ${CYAN}$$_->[0]${R}$$sep${B}$$_->[1]${X}\n"; \
				}; \
				print "\n"; \
			}

help:		##@Help View all available commands.
			$(shell $(TARGETS_EXE))
			@echo ${CYAN} Repository: ${UND}${BOLD}$(OUTPUT)${CYAN}${X}${CYAN}${UND}\\t\\t\\t\\t\\tAuthor: $(AUTHOR)${X}
			@echo ${CYAN} Last commit:${X}
			@echo ${CYAN} \\tDate: $(LAST_COMMIT_DATE)
			@echo ${CYAN} \\tHash: $(LAST_COMMIT_HASH)${X}
			@echo ${CYAN} \\tMessage: $(LAST_COMMIT_MESSAGE)${X}
			@echo ${CYAN}--------------------------------------------------------------------------
			@echo ${CYAN} Available commands:
			@perl -e '$(HELP_SCRIPT)' $(MAKEFILE_LIST)
			@echo ${CYAN}--------------------------------------------------------------------------

re:			##@Misc Call clean => all
			@make clean
			@make all

.PHONY:		all build clean re
