"""
╔══════════════════════════════════════════════════════════════════════════════╗
║                    AIRTEL ZAMBIA USSD MENU SIMULATOR                         ║
║                          Self-Service Portal (*117#)                         ║
║                                                                              ║
║  Professional USSD menu navigation system for Airtel Zambia bundles,         ║
║  balance inquiry, account management, and value-added services.             ║
╚══════════════════════════════════════════════════════════════════════════════╝
"""

import os
import sys
from datetime import datetime

# ANSI Color codes for terminal output
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    LIGHT_GRAY = '\033[37m'
    DARK_GRAY = '\033[90m'


class USSDMenu:
    def __init__(self):
        self.current_menu = "main"
        self.user_number = None
        self.session_history = []
        self.selected_bundle = None
        self.recipient_number = None
        
        # Define the complete menu structure
        self.menus = {
            "main": {
                "title": "Airtel Zambia Self-Service Portal",
                "ussd_code": "*117#",
                "options": {
                    "1": {
                        "text": "So Che packs (Voice + SMS + Data combo bundles)",
                        "type": "menu",
                        "target": "so_che_packs"
                    },
                    "2": {
                        "text": "Voice packs (Standalone voice minute bundles)",
                        "type": "menu",
                        "target": "voice_packs"
                    },
                    "3": {
                        "text": "SMS packs (Standalone SMS bundles)",
                        "type": "menu",
                        "target": "sms_packs"
                    },
                    "4": {
                        "text": "Data packs (Internet / Tonse data bundles)",
                        "type": "menu",
                        "target": "data_packs"
                    },
                    "5": {
                        "text": "Buy for other (Buy any bundle for another subscriber)",
                        "type": "menu",
                        "target": "buy_for_other"
                    },
                    "6": {
                        "text": "Check balance (View all active balances)",
                        "type": "menu",
                        "target": "check_balance"
                    },
                    "7": {
                        "text": "My account / settings (Account management & self-care)",
                        "type": "menu",
                        "target": "my_account"
                    },
                    "8": {
                        "text": "Roaming & international (International calls and roaming)",
                        "type": "menu",
                        "target": "roaming"
                    },
                    "9": {
                        "text": "More services (Additional Airtel value-added services)",
                        "type": "menu",
                        "target": "more_services"
                    },
                    "0": {
                        "text": "Exit",
                        "type": "action",
                        "action": "exit"
                    }
                }
            },
            
            "so_che_packs": {
                "title": "So Che Packs",
                "description": "Voice + SMS + Data combo bundles",
                "parent": "main",
                "options": {
                    "1": {
                        "text": "Airtel pack (on-net) - Calls, SMS, data - Airtel to Airtel only",
                        "type": "menu",
                        "target": "airtel_on_net_pack"
                    },
                    "2": {
                        "text": "All-networks pack - Calls, SMS, data - any network",
                        "type": "menu",
                        "target": "all_networks_pack"
                    },
                    "3": {
                        "text": "Check So Che balance",
                        "type": "action",
                        "action": "show_balance",
                        "balance_type": "so_che"
                    },
                    "4": {
                        "text": "Buy for another number",
                        "type": "menu",
                        "target": "buy_for_other_recipient"
                    },
                    "0": {
                        "text": "Back",
                        "type": "action",
                        "action": "back"
                    }
                }
            },
            
            "airtel_on_net_pack": {
                "title": "Airtel Pack (On-Net)",
                "description": "Calls, SMS, data - Airtel to Airtel only",
                "parent": "so_che_packs",
                "options": {
                    "1": {
                        "text": "Daily pack (24 hrs from time of purchase)",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "Airtel On-Net Pack",
                        "validity": "Daily (24 hrs)"
                    },
                    "2": {
                        "text": "Weekly pack (7-day validity)",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "Airtel On-Net Pack",
                        "validity": "Weekly (7 days)"
                    },
                    "3": {
                        "text": "Monthly pack (30-day validity)",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "Airtel On-Net Pack",
                        "validity": "Monthly (30 days)"
                    },
                    "0": {
                        "text": "Back",
                        "type": "action",
                        "action": "back"
                    }
                }
            },
            
            "all_networks_pack": {
                "title": "All-Networks Pack",
                "description": "Calls, SMS, data - any network",
                "parent": "so_che_packs",
                "options": {
                    "1": {
                        "text": "Daily pack (24 hrs from time of purchase)",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "All-Networks Pack",
                        "validity": "Daily (24 hrs)"
                    },
                    "2": {
                        "text": "Weekly pack (7-day validity)",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "All-Networks Pack",
                        "validity": "Weekly (7 days)"
                    },
                    "3": {
                        "text": "Monthly pack (30-day validity)",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "All-Networks Pack",
                        "validity": "Monthly (30 days)"
                    },
                    "0": {
                        "text": "Back",
                        "type": "action",
                        "action": "back"
                    }
                }
            },
            
            "voice_packs": {
                "title": "Voice Packs",
                "description": "Standalone voice minute bundles",
                "parent": "main",
                "options": {
                    "1": {
                        "text": "Airtel voice pack (on-net)",
                        "type": "menu",
                        "target": "airtel_voice_pack"
                    },
                    "2": {
                        "text": "All-networks voice pack",
                        "type": "menu",
                        "target": "all_networks_voice_pack"
                    },
                    "3": {
                        "text": "Check voice balance",
                        "type": "action",
                        "action": "show_balance",
                        "balance_type": "voice"
                    },
                    "0": {
                        "text": "Back",
                        "type": "action",
                        "action": "back"
                    }
                }
            },
            
            "airtel_voice_pack": {
                "title": "Airtel Voice Pack (On-Net)",
                "parent": "voice_packs",
                "options": {
                    "1": {
                        "text": "Daily",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "Airtel Voice Pack (On-Net)",
                        "validity": "Daily"
                    },
                    "2": {
                        "text": "Weekly",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "Airtel Voice Pack (On-Net)",
                        "validity": "Weekly"
                    },
                    "3": {
                        "text": "Monthly",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "Airtel Voice Pack (On-Net)",
                        "validity": "Monthly"
                    },
                    "0": {
                        "text": "Back",
                        "type": "action",
                        "action": "back"
                    }
                }
            },
            
            "all_networks_voice_pack": {
                "title": "All-Networks Voice Pack",
                "parent": "voice_packs",
                "options": {
                    "1": {
                        "text": "Daily",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "All-Networks Voice Pack",
                        "validity": "Daily"
                    },
                    "2": {
                        "text": "Weekly",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "All-Networks Voice Pack",
                        "validity": "Weekly"
                    },
                    "3": {
                        "text": "Monthly",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "All-Networks Voice Pack",
                        "validity": "Monthly"
                    },
                    "0": {
                        "text": "Back",
                        "type": "action",
                        "action": "back"
                    }
                }
            },
            
            "sms_packs": {
                "title": "SMS Packs",
                "description": "Standalone SMS bundles",
                "parent": "main",
                "options": {
                    "1": {
                        "text": "Airtel SMS pack (on-net)",
                        "type": "menu",
                        "target": "airtel_sms_pack"
                    },
                    "2": {
                        "text": "All-networks SMS pack",
                        "type": "menu",
                        "target": "all_networks_sms_pack"
                    },
                    "3": {
                        "text": "Check SMS balance",
                        "type": "action",
                        "action": "show_balance",
                        "balance_type": "sms"
                    },
                    "0": {
                        "text": "Back",
                        "type": "action",
                        "action": "back"
                    }
                }
            },
            
            "airtel_sms_pack": {
                "title": "Airtel SMS Pack (On-Net)",
                "parent": "sms_packs",
                "options": {
                    "1": {
                        "text": "Daily",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "Airtel SMS Pack (On-Net)",
                        "validity": "Daily"
                    },
                    "2": {
                        "text": "Weekly",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "Airtel SMS Pack (On-Net)",
                        "validity": "Weekly"
                    },
                    "3": {
                        "text": "Monthly",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "Airtel SMS Pack (On-Net)",
                        "validity": "Monthly"
                    },
                    "0": {
                        "text": "Back",
                        "type": "action",
                        "action": "back"
                    }
                }
            },
            
            "all_networks_sms_pack": {
                "title": "All-Networks SMS Pack",
                "parent": "sms_packs",
                "options": {
                    "1": {
                        "text": "Daily",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "All-Networks SMS Pack",
                        "validity": "Daily"
                    },
                    "2": {
                        "text": "Weekly",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "All-Networks SMS Pack",
                        "validity": "Weekly"
                    },
                    "3": {
                        "text": "Monthly",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "All-Networks SMS Pack",
                        "validity": "Monthly"
                    },
                    "0": {
                        "text": "Back",
                        "type": "action",
                        "action": "back"
                    }
                }
            },
            
            "data_packs": {
                "title": "Data Packs",
                "description": "Internet / Tonse data bundles",
                "parent": "main",
                "options": {
                    "1": {
                        "text": "Buy data bundle (Tonse bundles - daily/weekly/monthly)",
                        "type": "menu",
                        "target": "buy_data_bundle"
                    },
                    "2": {
                        "text": "Data Me2U (Share data to another Airtel number)",
                        "type": "menu",
                        "target": "data_me2u"
                    },
                    "3": {
                        "text": "Night Data Pack (1.5 GB midnight-5 AM for K5)",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "Night Data Pack",
                        "validity": "Nightly"
                    },
                    "4": {
                        "text": "Check data balance",
                        "type": "action",
                        "action": "show_balance",
                        "balance_type": "data"
                    },
                    "0": {
                        "text": "Back",
                        "type": "action",
                        "action": "back"
                    }
                }
            },
            
            "buy_data_bundle": {
                "title": "Buy Data Bundle",
                "description": "Tonse bundles - daily / weekly / monthly",
                "parent": "data_packs",
                "options": {
                    "1": {
                        "text": "Daily data (Short-validity packs)",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "Tonse Daily Data",
                        "validity": "Daily"
                    },
                    "2": {
                        "text": "Weekly data",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "Tonse Weekly Data",
                        "validity": "Weekly"
                    },
                    "3": {
                        "text": "Monthly data",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "Tonse Monthly Data",
                        "validity": "Monthly"
                    },
                    "0": {
                        "text": "Back",
                        "type": "action",
                        "action": "back"
                    }
                }
            },
            
            "data_me2u": {
                "title": "Data Me2U",
                "description": "Transfer data to another Airtel number",
                "parent": "data_packs",
                "options": {
                    "1": {
                        "text": "Send data (Enter recipient number + amount)",
                        "type": "action",
                        "action": "send_data"
                    },
                    "2": {
                        "text": "Check transfer history",
                        "type": "action",
                        "action": "show_transfer_history"
                    },
                    "3": {
                        "text": "Buy for other (Enter recipient number then choose bundle)",
                        "type": "menu",
                        "target": "buy_data_for_other"
                    },
                    "0": {
                        "text": "Back",
                        "type": "action",
                        "action": "back"
                    }
                }
            },
            
            "buy_data_for_other": {
                "title": "Buy Data for Other",
                "parent": "data_me2u",
                "options": {
                    "1": {
                        "text": "Daily data",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "Tonse Daily Data (Other)",
                        "validity": "Daily"
                    },
                    "2": {
                        "text": "Weekly data",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "Tonse Weekly Data (Other)",
                        "validity": "Weekly"
                    },
                    "3": {
                        "text": "Monthly data",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "Tonse Monthly Data (Other)",
                        "validity": "Monthly"
                    },
                    "0": {
                        "text": "Back",
                        "type": "action",
                        "action": "back"
                    }
                }
            },
            
            "check_balance": {
                "title": "Check Balance",
                "description": "View all active balances",
                "parent": "main",
                "options": {
                    "1": {
                        "text": "Airtime balance",
                        "type": "action",
                        "action": "show_balance",
                        "balance_type": "airtime"
                    },
                    "2": {
                        "text": "Voice minutes balance",
                        "type": "action",
                        "action": "show_balance",
                        "balance_type": "voice_minutes"
                    },
                    "3": {
                        "text": "SMS balance",
                        "type": "action",
                        "action": "show_balance",
                        "balance_type": "sms"
                    },
                    "4": {
                        "text": "Data balance (All active Tonse bundles summarised by validity)",
                        "type": "action",
                        "action": "show_balance",
                        "balance_type": "data"
                    },
                    "5": {
                        "text": "All balances summary",
                        "type": "action",
                        "action": "show_balance",
                        "balance_type": "all"
                    },
                    "0": {
                        "text": "Back",
                        "type": "action",
                        "action": "back"
                    }
                }
            },
            
            "my_account": {
                "title": "My Account / Settings",
                "description": "Account management & self-care",
                "parent": "main",
                "options": {
                    "1": {
                        "text": "View registered details",
                        "type": "action",
                        "action": "view_details"
                    },
                    "2": {
                        "text": "Auto-renewal settings (Manage recurring bundle renewal)",
                        "type": "action",
                        "action": "manage_auto_renewal"
                    },
                    "3": {
                        "text": "SIM swap (self-service) [Also: *537#]",
                        "type": "action",
                        "action": "sim_swap"
                    },
                    "4": {
                        "text": "Manage Do Not Disturb (DND)",
                        "type": "action",
                        "action": "manage_dnd"
                    },
                    "5": {
                        "text": "Opt in / out of promos",
                        "type": "action",
                        "action": "promo_settings"
                    },
                    "0": {
                        "text": "Back",
                        "type": "action",
                        "action": "back"
                    }
                }
            },
            
            "roaming": {
                "title": "Roaming & International",
                "description": "International calls and roaming services",
                "parent": "main",
                "options": {
                    "1": {
                        "text": "International call bundles (Discounted bundles to specific countries)",
                        "type": "menu",
                        "target": "intl_call_bundles"
                    },
                    "2": {
                        "text": "Roaming options (View/activate roaming while abroad)",
                        "type": "action",
                        "action": "roaming_options"
                    },
                    "3": {
                        "text": "International calling rates",
                        "type": "action",
                        "action": "intl_rates"
                    },
                    "0": {
                        "text": "Back",
                        "type": "action",
                        "action": "back"
                    }
                }
            },
            
            "intl_call_bundles": {
                "title": "International Call Bundles",
                "description": "Discounted bundles to specific countries",
                "parent": "roaming",
                "options": {
                    "1": {
                        "text": "Buy international bundle",
                        "type": "action",
                        "action": "purchase",
                        "bundle_type": "International Call Bundle",
                        "validity": "Variable"
                    },
                    "2": {
                        "text": "Check international balance",
                        "type": "action",
                        "action": "show_balance",
                        "balance_type": "international"
                    },
                    "0": {
                        "text": "Back",
                        "type": "action",
                        "action": "back"
                    }
                }
            },
            
            "more_services": {
                "title": "More Services",
                "description": "Additional Airtel value-added services",
                "parent": "main",
                "options": {
                    "1": {
                        "text": "Caller tunes / Hello Tunes [Also: *455#]",
                        "type": "action",
                        "action": "caller_tunes"
                    },
                    "2": {
                        "text": "Airtel Football [Also: *440#]",
                        "type": "action",
                        "action": "airtel_football"
                    },
                    "3": {
                        "text": "International voice calling",
                        "type": "action",
                        "action": "intl_voice_calling"
                    },
                    "4": {
                        "text": "Airtime Siliza (borrow) [Also: *458#]",
                        "type": "action",
                        "action": "airtime_siliza"
                    },
                    "5": {
                        "text": "Airtel Money link [*115# or *774#]",
                        "type": "action",
                        "action": "airtel_money"
                    },
                    "0": {
                        "text": "Back",
                        "type": "action",
                        "action": "back"
                    }
                }
            },
            
            "buy_for_other": {
                "title": "Buy for Other",
                "description": "Buy any bundle for another subscriber",
                "parent": "main",
                "options": {
                    "1": {
                        "text": "So Che pack",
                        "type": "menu",
                        "target": "so_che_packs"
                    },
                    "2": {
                        "text": "Voice pack",
                        "type": "menu",
                        "target": "voice_packs"
                    },
                    "3": {
                        "text": "Tonse internet bundle",
                        "type": "menu",
                        "target": "data_packs"
                    },
                    "4": {
                        "text": "SMS pack",
                        "type": "menu",
                        "target": "sms_packs"
                    },
                    "0": {
                        "text": "Back",
                        "type": "action",
                        "action": "back"
                    }
                }
            },
            
            "buy_for_other_recipient": {
                "title": "Buy for another number",
                "parent": "so_che_packs",
                "options": {
                    "text": "Enter recipient's Airtel number",
                    "type": "input",
                    "action": "input_recipient"
                }
            }
        }
    
    def clear_screen(self):
        """Clear terminal screen"""
        os.system('cls' if os.name == 'nt' else 'clear')
    
    def display_header(self):
        """Display professional header"""
        print(f"{Colors.CYAN}")
        print("╔" + "═"*78 + "╗")
        print("║" + " "*78 + "║")
        print("║" + f"{'AIRTEL ZAMBIA - SELF-SERVICE MENU'.center(78)}" + "║")
        print("║" + f"{'Dial *117# for mobile or use this simulator'.center(78)}" + "║")
        print("║" + " "*78 + "║")
        print("╚" + "═"*78 + "╝")
        print(f"{Colors.ENDC}")
    
    def display_menu(self):
        """Display current menu and options"""
        self.clear_screen()
        self.display_header()
        
        current = self.menus[self.current_menu]
        print(f"\n{Colors.BOLD}{Colors.BLUE}┌─ {current['title'].upper()} {'─'*(70-len(current['title']))}┐{Colors.ENDC}")
        
        if "description" in current:
            print(f"{Colors.LIGHT_GRAY}│ {current['description']:<76}│{Colors.ENDC}")
            print(f"{Colors.DARK_GRAY}├─────────────────────────────────────────────────────────────────────────────┤{Colors.ENDC}")
        else:
            print(f"{Colors.DARK_GRAY}├─────────────────────────────────────────────────────────────────────────────┤{Colors.ENDC}")
        
        options = current.get("options", {})
        for key, value in sorted(options.items()):
            if isinstance(value, dict):
                option_text = f"  {Colors.GREEN}{key}{Colors.ENDC}. {value['text']}"
                print(f"│ {option_text:<76}│")
        
        print(f"{Colors.BLUE}└─────────────────────────────────────────────────────────────────────────────┘{Colors.ENDC}\n")
    
    def process_input(self, user_input):
        """Process user input and navigate menu"""
        current = self.menus[self.current_menu]
        options = current.get("options", {})
        
        if user_input not in options:
            print(f"{Colors.RED}✘ Invalid option. Please select from the available menu options.{Colors.ENDC}")
            input(f"\n{Colors.DARK_GRAY}Press Enter to continue...{Colors.ENDC}")
            return
        
        selected = options[user_input]
        self.session_history.append((self.current_menu, user_input))
        
        if selected["type"] == "menu":
            self.current_menu = selected["target"]
        elif selected["type"] == "action":
            self.handle_action(selected)
        elif selected["type"] == "input":
            self.handle_input(selected)
    
    def handle_action(self, action_data):
        """Handle action selections"""
        action_type = action_data.get("action")
        
        if action_type == "exit":
            self.clear_screen()
            print(f"{Colors.CYAN}")
            print("╔" + "═"*78 + "╗")
            print("║" + " "*78 + "║")
            print("║" + f"{'Thank you for using Airtel Zambia *117#'.center(78)}" + "║")
            print("║" + f"{'Self-Service Portal'.center(78)}" + "║")
            print("║" + " "*78 + "║")
            print("║" + f"{'Visit www.airtel.zm for more information'.center(78)}" + "║")
            print("║" + " "*78 + "║")
            print("╚" + "═"*78 + "╝")
            print(f"{Colors.ENDC}\n")
            sys.exit(0)
        
        elif action_type == "back":
            if len(self.session_history) > 0:
                prev_menu, _ = self.session_history.pop()
                if "parent" in self.menus[self.current_menu]:
                    self.current_menu = self.menus[self.current_menu]["parent"]
                else:
                    self.current_menu = "main"
        
        elif action_type == "purchase":
            self.handle_purchase(action_data)
        
        elif action_type == "show_balance":
            self.show_balance(action_data.get("balance_type"))
        
        elif action_type == "send_data":
            self.show_section_header("DATA ME2U - Transfer Data")
            print(f"\n{Colors.BOLD}Enter recipient's Airtel number:{Colors.ENDC}")
            recipient = input(f"{Colors.YELLOW}➜ {Colors.ENDC}").strip()
            if self.validate_phone(recipient):
                print(f"\n{Colors.BOLD}Enter amount to send (in GB):{Colors.ENDC}")
                amount = input(f"{Colors.YELLOW}➜ {Colors.ENDC}").strip()
                print(f"\n{Colors.GREEN}✓ Processing transfer to {recipient}...{Colors.ENDC}")
                print(f"{Colors.GREEN}✓ Transaction successful!{Colors.ENDC}")
                print(f"{Colors.DARK_GRAY}Data transferred: {amount}GB to {recipient}{Colors.ENDC}")
            else:
                print(f"\n{Colors.RED}✘ Invalid phone number format.{Colors.ENDC}")
            input(f"\n{Colors.DARK_GRAY}Press Enter to continue...{Colors.ENDC}")
        
        elif action_type == "view_details":
            self.show_section_header("Account Details")
            print(f"\n{Colors.BOLD}Your Account Information:{Colors.ENDC}\n")
            print(f"  Phone Number        : {Colors.CYAN}{self.user_number}{Colors.ENDC}")
            print(f"  Account Status      : {Colors.GREEN}Active{Colors.ENDC}")
            print(f"  Registration Status : {Colors.GREEN}Verified{Colors.ENDC}")
            print(f"  Customer Type       : {Colors.CYAN}Prepaid{Colors.ENDC}")
            input(f"\n{Colors.DARK_GRAY}Press Enter to continue...{Colors.ENDC}")
        
        elif action_type == "manage_auto_renewal":
            self.show_section_header("Auto-Renewal Settings")
            print(f"\n{Colors.BOLD}Manage your auto-renewal preferences:{Colors.ENDC}\n")
            print(f"  {Colors.GREEN}1{Colors.ENDC}. Enable auto-renewal")
            print(f"  {Colors.GREEN}2{Colors.ENDC}. Disable auto-renewal")
            print(f"  {Colors.GREEN}3{Colors.ENDC}. View active auto-renewals")
            print(f"  {Colors.GREEN}0{Colors.ENDC}. Back")
            choice = input(f"\n{Colors.YELLOW}Select option: ➜ {Colors.ENDC}").strip()
            if choice in ["1", "2", "3"]:
                print(f"\n{Colors.GREEN}✓ Settings updated successfully!{Colors.ENDC}")
            input(f"\n{Colors.DARK_GRAY}Press Enter to continue...{Colors.ENDC}")
        
        elif action_type == "sim_swap":
            self.show_section_header("SIM Swap - Self Service")
            print(f"\n{Colors.YELLOW}⚠ SIM Swap Service{Colors.ENDC}\n")
            print("This service requires identity verification for security purposes.")
            print(f"→ Please contact Airtel Customer Care: {Colors.CYAN}193{Colors.ENDC}")
            print(f"→ Or visit: {Colors.CYAN}www.airtel.zm{Colors.ENDC}")
            print(f"\nAlternative USSD code: {Colors.CYAN}*537#{Colors.ENDC}")
            input(f"\n{Colors.DARK_GRAY}Press Enter to continue...{Colors.ENDC}")
        
        elif action_type == "manage_dnd":
            self.show_section_header("Do Not Disturb (DND)")
            print(f"\n{Colors.BOLD}Do Not Disturb Settings:{Colors.ENDC}\n")
            print(f"  {Colors.GREEN}1{Colors.ENDC}. Enable DND")
            print(f"  {Colors.GREEN}2{Colors.ENDC}. Disable DND")
            print(f"  {Colors.GREEN}3{Colors.ENDC}. Check DND status")
            choice = input(f"\n{Colors.YELLOW}Select option: ➜ {Colors.ENDC}").strip()
            if choice in ["1", "2", "3"]:
                print(f"\n{Colors.GREEN}✓ DND settings updated successfully!{Colors.ENDC}")
            input(f"\n{Colors.DARK_GRAY}Press Enter to continue...{Colors.ENDC}")
        
        elif action_type == "promo_settings":
            self.show_section_header("Promotional Settings")
            print(f"\n{Colors.BOLD}Manage promotional communications:{Colors.ENDC}\n")
            print(f"  {Colors.GREEN}1{Colors.ENDC}. Opt in to promotional offers")
            print(f"  {Colors.GREEN}2{Colors.ENDC}. Opt out from promotional offers")
            choice = input(f"\n{Colors.YELLOW}Select option: ➜ {Colors.ENDC}").strip()
            if choice in ["1", "2"]:
                status = "enabled" if choice == "1" else "disabled"
                print(f"\n{Colors.GREEN}✓ Promotional offers {status}!{Colors.ENDC}")
            input(f"\n{Colors.DARK_GRAY}Press Enter to continue...{Colors.ENDC}")
        
        elif action_type == "caller_tunes":
            self.show_section_header("Caller Tunes / Hello Tunes")
            print(f"\n{Colors.BOLD}Caller Tunes Service{Colors.ENDC}\n")
            print("Personalize what your callers hear when they call you.")
            print(f"\n→ Direct USSD code: {Colors.CYAN}*455#{Colors.ENDC}")
            print(f"→ Available plans with Voice, SMS, and Data bundles")
            input(f"\n{Colors.DARK_GRAY}Press Enter to continue...{Colors.ENDC}")
        
        elif action_type == "airtel_football":
            self.show_section_header("Airtel Football")
            print(f"\n{Colors.BOLD}Airtel Football Service{Colors.ENDC}\n")
            print(f"  {Colors.GREEN}1{Colors.ENDC}. View match schedules")
            print(f"  {Colors.GREEN}2{Colors.ENDC}. Check live scores")
            print(f"  {Colors.GREEN}3{Colors.ENDC}. Subscribe to match alerts")
            print(f"\n→ Direct USSD code: {Colors.CYAN}*440#{Colors.ENDC}")
            input(f"\n{Colors.DARK_GRAY}Press Enter to continue...{Colors.ENDC}")
        
        elif action_type == "intl_voice_calling":
            self.show_section_header("International Voice Calling")
            print(f"\n{Colors.BOLD}International Calling Rates{Colors.ENDC}\n")
            rates = [
                ("USA", "K2.50/min"),
                ("UK", "K2.00/min"),
                ("South Africa", "K1.50/min"),
                ("India", "K1.50/min"),
                ("Other countries", "Variable rates (contact support)")
            ]
            for country, rate in rates:
                print(f"  {Colors.CYAN}{country:<20}{Colors.ENDC} {rate}")
            input(f"\n{Colors.DARK_GRAY}Press Enter to continue...{Colors.ENDC}")
        
        elif action_type == "airtime_siliza":
            self.show_section_header("Airtime Siliza - Borrow Airtime")
            print(f"\n{Colors.BOLD}Borrow Airtime and Repay Later{Colors.ENDC}\n")
            print("Airtime Siliza allows you to borrow airtime when you run out.")
            print("Repay the borrowed amount within 7 days.")
            print(f"\n→ Direct USSD code: {Colors.CYAN}*458#{Colors.ENDC}")
            print(f"→ Representative APR: {Colors.YELLOW}0%{Colors.ENDC} (Terms & Conditions apply)")
            input(f"\n{Colors.DARK_GRAY}Press Enter to continue...{Colors.ENDC}")
        
        elif action_type == "airtel_money":
            self.show_section_header("Airtel Money Link")
            print(f"\n{Colors.BOLD}Airtel Money - Mobile Financial Services{Colors.ENDC}\n")
            print("Send and receive money, pay bills, buy goods and services.")
            print(f"\n→ Direct USSD codes:")
            print(f"   {Colors.CYAN}*115#{Colors.ENDC} or {Colors.CYAN}*774#{Colors.ENDC}")
            print(f"→ Available 24/7")
            input(f"\n{Colors.DARK_GRAY}Press Enter to continue...{Colors.ENDC}")
        
        elif action_type == "roaming_options":
            self.show_section_header("Roaming Options")
            print(f"\n{Colors.BOLD}International Roaming Management:{Colors.ENDC}\n")
            print(f"  {Colors.GREEN}1{Colors.ENDC}. Enable roaming")
            print(f"  {Colors.GREEN}2{Colors.ENDC}. Disable roaming")
            print(f"  {Colors.GREEN}3{Colors.ENDC}. View roaming packages")
            choice = input(f"\n{Colors.YELLOW}Select option: ➜ {Colors.ENDC}").strip()
            if choice in ["1", "2", "3"]:
                print(f"\n{Colors.GREEN}✓ Roaming settings updated!{Colors.ENDC}")
            input(f"\n{Colors.DARK_GRAY}Press Enter to continue...{Colors.ENDC}")
        
        elif action_type == "intl_rates":
            self.show_section_header("International Calling Rates")
            print(f"\n{Colors.BOLD}Standard PAYG Rates:{Colors.ENDC}\n")
            rates = [
                ("USA", "K2.50", "per minute"),
                ("UK", "K2.00", "per minute"),
                ("South Africa", "K1.50", "per minute"),
                ("India", "K1.50", "per minute"),
                ("Australia", "K3.00", "per minute"),
                ("Canada", "K2.50", "per minute"),
                ("Germany", "K2.20", "per minute"),
            ]
            for country, rate, unit in rates:
                print(f"  {Colors.CYAN}{country:<20}{Colors.ENDC} {Colors.YELLOW}{rate:>6}{Colors.ENDC} {unit}")
            print(f"\n{Colors.DARK_GRAY}Other countries: Variable rates (Please contact support){Colors.ENDC}")
            input(f"\n{Colors.DARK_GRAY}Press Enter to continue...{Colors.ENDC}")
        
        elif action_type == "show_transfer_history":
            self.show_section_header("Data Transfer History")
            print(f"\n{Colors.LIGHT_GRAY}No recent data transfers.{Colors.ENDC}")
            print(f"\n{Colors.DARK_GRAY}Your data transfer history will appear here.{Colors.ENDC}")
            input(f"\n{Colors.DARK_GRAY}Press Enter to continue...{Colors.ENDC}")
    
    def handle_purchase(self, purchase_data):
        """Simulate bundle purchase"""
        bundle_type = purchase_data.get("bundle_type")
        validity = purchase_data.get("validity")
        
        self.show_section_header(f"Purchase - {bundle_type}")
        print(f"\n{Colors.BOLD}Bundle Details:{Colors.ENDC}")
        print(f"  Bundle Type : {Colors.CYAN}{bundle_type}{Colors.ENDC}")
        print(f"  Validity    : {Colors.YELLOW}{validity}{Colors.ENDC}\n")
        print(f"{Colors.BOLD}Select payment method:{Colors.ENDC}")
        print(f"  {Colors.GREEN}1{Colors.ENDC}. Airtime (K5 - K100)")
        print(f"  {Colors.GREEN}2{Colors.ENDC}. Airtel Money")
        print(f"  {Colors.GREEN}3{Colors.ENDC}. Debit Card")
        print(f"  {Colors.GREEN}0{Colors.ENDC}. Cancel")
        
        choice = input(f"\n{Colors.YELLOW}Select payment method: ➜ {Colors.ENDC}").strip()
        if choice in ["1", "2", "3"]:
            payment_methods = {
                "1": "Airtime",
                "2": "Airtel Money",
                "3": "Debit Card"
            }
            print(f"\n{Colors.YELLOW}⏳ Processing payment via {payment_methods[choice]}...{Colors.ENDC}")
            print(f"{Colors.GREEN}✓ Payment successful!{Colors.ENDC}")
            print(f"{Colors.GREEN}✓ Bundle activated successfully!{Colors.ENDC}")
            print(f"\n{Colors.BOLD}Activation Confirmation:{Colors.ENDC}")
            print(f"  Bundle    : {Colors.CYAN}{bundle_type}{Colors.ENDC}")
            print(f"  Validity  : {Colors.CYAN}{validity}{Colors.ENDC}")
            print(f"  Status    : {Colors.GREEN}ACTIVE{Colors.ENDC}")
        elif choice == "0":
            print(f"\n{Colors.YELLOW}⊘ Purchase cancelled.{Colors.ENDC}")
        else:
            print(f"\n{Colors.RED}✘ Invalid payment method selected.{Colors.ENDC}")
        
        input(f"\n{Colors.DARK_GRAY}Press Enter to continue...{Colors.ENDC}")
    
    def show_section_header(self, title):
        """Display a professional section header"""
        self.clear_screen()
        self.display_header()
        print()
    
    def show_balance(self, balance_type):
        """Display balance information"""
        self.show_section_header(f"Account Balance - {balance_type.title()}")
        
        balances = {
            "airtime": {
                "title": "Airtime Balance",
                "data": [
                    ("Current Balance", f"{Colors.YELLOW}K150.50{Colors.ENDC}")
                ]
            },
            "voice": {
                "title": "Voice Minutes Balance",
                "data": [
                    ("Available Minutes", f"{Colors.YELLOW}250 mins{Colors.ENDC}"),
                    ("Expiry Date", f"{Colors.CYAN}30 Apr 2026{Colors.ENDC}")
                ]
            },
            "voice_minutes": {
                "title": "Voice Minutes Balance",
                "data": [
                    ("Available Minutes", f"{Colors.YELLOW}250 mins{Colors.ENDC}"),
                    ("Expiry Date", f"{Colors.CYAN}30 Apr 2026{Colors.ENDC}")
                ]
            },
            "sms": {
                "title": "SMS Balance",
                "data": [
                    ("Available SMS", f"{Colors.YELLOW}100 SMS{Colors.ENDC}"),
                    ("Expiry Date", f"{Colors.CYAN}30 Apr 2026{Colors.ENDC}")
                ]
            },
            "data": {
                "title": "Data Balance",
                "data": [
                    ("Available Data", f"{Colors.YELLOW}5.2 GB{Colors.ENDC}"),
                    ("Bundle Type", f"{Colors.CYAN}Monthly Tonse{Colors.ENDC}"),
                    ("Expiry Date", f"{Colors.CYAN}15 May 2026{Colors.ENDC}")
                ]
            },
            "so_che": {
                "title": "So Che Pack Balance",
                "data": [
                    ("Voice Minutes", f"{Colors.YELLOW}500 mins{Colors.ENDC}"),
                    ("SMS", f"{Colors.YELLOW}200 SMS{Colors.ENDC}"),
                    ("Data", f"{Colors.YELLOW}2 GB{Colors.ENDC}"),
                    ("Expiry Date", f"{Colors.CYAN}15 May 2026{Colors.ENDC}")
                ]
            },
            "international": {
                "title": "International Balance",
                "data": [
                    ("Current Balance", f"{Colors.YELLOW}K0.00{Colors.ENDC}"),
                    ("Status", f"{Colors.YELLOW}No active bundles{Colors.ENDC}")
                ]
            },
            "all": {
                "title": "Complete Account Summary",
                "data": [
                    ("Airtime", f"{Colors.YELLOW}K150.50{Colors.ENDC}"),
                    ("Voice Minutes", f"{Colors.YELLOW}250 mins{Colors.ENDC}"),
                    ("SMS", f"{Colors.YELLOW}100 SMS{Colors.ENDC}"),
                    ("Data", f"{Colors.YELLOW}5.2 GB{Colors.ENDC}"),
                    ("So Che Pack", f"{Colors.YELLOW}500+200+2GB{Colors.ENDC}"),
                    ("International", f"{Colors.YELLOW}K0.00{Colors.ENDC}"),
                    ("Last Updated", f"{Colors.CYAN}{datetime.now().strftime('%H:%M:%S')}{Colors.ENDC}")
                ]
            }
        }
        
        balance_info = balances.get(balance_type, None)
        
        if balance_info:
            print(f"\n{Colors.BOLD}{Colors.BLUE}┌─ {balance_info['title']} {'─'*(60-len(balance_info['title']))}┐{Colors.ENDC}")
            print(f"{Colors.BLUE}│{Colors.ENDC}\n")
            
            for label, value in balance_info["data"]:
                print(f"  {Colors.BOLD}{label:<25}{Colors.ENDC} : {value}")
            
            print(f"\n{Colors.BLUE}│{Colors.ENDC}")
            print(f"{Colors.BLUE}└{'─'*76}┘{Colors.ENDC}")
        else:
            print(f"\n{Colors.RED}Balance information unavailable for this selection.{Colors.ENDC}")
        
        input(f"\n{Colors.DARK_GRAY}Press Enter to continue...{Colors.ENDC}")
    
    def handle_input(self, input_data):
        """Handle input prompts"""
        print(f"\n{Colors.BOLD}{input_data.get('text', 'Enter value:')}{Colors.ENDC}")
        user_input = input(f"{Colors.YELLOW}➜ {Colors.ENDC}").strip()
        if input_data.get("action") == "input_recipient":
            if self.validate_phone(user_input):
                self.recipient_number = user_input
                print(f"\n{Colors.GREEN}✓ Recipient confirmed: {user_input}{Colors.ENDC}")
                print("Proceed with bundle selection...")
            else:
                print(f"{Colors.RED}✘ Invalid phone number format.{Colors.ENDC}")
    
    def validate_phone(self, phone_number):
        """Validate Zambian phone number"""
        # Remove any spaces or dashes
        phone_number = phone_number.replace(" ", "").replace("-", "")
        # Check for valid Zambian number format
        return len(phone_number) >= 10 and phone_number.isdigit()
    
    def start(self, user_number=None):
        """Start the USSD session"""
        if user_number:
            self.user_number = user_number
        else:
            self.clear_screen()
            self.display_header()
            print(f"\n{Colors.BOLD}Welcome to Airtel Zambia Self-Service Portal!{Colors.ENDC}")
            print(f"\n{Colors.BOLD}Enter your phone number:{Colors.ENDC}")
            self.user_number = input(f"{Colors.YELLOW}➜ {Colors.ENDC}").strip()
        
        if not self.validate_phone(self.user_number):
            print(f"\n{Colors.RED}✘ Invalid phone number format. Please try again.{Colors.ENDC}")
            return self.start()
        
        print(f"\n{Colors.GREEN}✓ Connecting to *117# service...{Colors.ENDC}")
        print(f"{Colors.GREEN}✓ Session started for {self.user_number}{Colors.ENDC}\n")
        
        input(f"{Colors.DARK_GRAY}Press Enter to begin...{Colors.ENDC}")
        
        while True:
            self.display_menu()
            user_choice = input(f"{Colors.YELLOW}Select option: ➜ {Colors.ENDC}").strip()
            self.process_input(user_choice)


# Main execution
if __name__ == "__main__":
    try:
        ussd = USSDMenu()
        ussd.start()
    except KeyboardInterrupt:
        print(f"\n\n{Colors.YELLOW}⊘ Session interrupted by user.{Colors.ENDC}")
        print(f"{Colors.DARK_GRAY}Thank you for using Airtel Zambia *117#.{Colors.ENDC}\n")
        sys.exit(0)
    except Exception as e:
        print(f"\n{Colors.RED}✘ An error occurred: {str(e)}{Colors.ENDC}")
        sys.exit(1)
