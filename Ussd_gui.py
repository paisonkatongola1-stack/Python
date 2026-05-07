"""
╔══════════════════════════════════════════════════════════════════════════════╗
║              AIRTEL ZAMBIA USSD MENU SIMULATOR — GUI Edition                 ║
║                       Self-Service Portal (*117#)                            ║
║                                                                              ║
║  Tkinter-based GUI simulation of the Airtel Zambia USSD menu system.        ║
╚══════════════════════════════════════════════════════════════════════════════╝
"""

import tkinter as tk
from tkinter import ttk, messagebox, simpledialog
import time
from datetime import datetime
import sys

# ─────────────────────────────────────────────
#  Colour / Font palette
# ─────────────────────────────────────────────
COLORS = {
    "bg":          "#0D0D0D",
    "surface":     "#161616",
    "card":        "#1E1E1E",
    "border":      "#2A2A2A",
    "red_primary": "#E8002D",   # Airtel red
    "red_dark":    "#B30022",
    "red_hover":   "#FF1A45",
    "green":       "#00C853",
    "yellow":      "#FFD600",
    "cyan":        "#00BCD4",
    "text":        "#F5F5F5",
    "text_muted":  "#9E9E9E",
    "text_dim":    "#616161",
    "white":       "#FFFFFF",
    "input_bg":    "#252525",
    "success_bg":  "#0A2A0A",
    "error_bg":    "#2A0A0A",
    "info_bg":     "#0A1A2A",
}

FONT_FAMILY = "Segoe UI"

FONTS = {
    "title":    (FONT_FAMILY, 18, "bold"),
    "subtitle": (FONT_FAMILY, 11),
    "heading":  (FONT_FAMILY, 13, "bold"),
    "body":     (FONT_FAMILY, 11),
    "body_sm":  (FONT_FAMILY, 10),
    "mono":     ("Consolas", 10),
    "btn":      (FONT_FAMILY, 11, "bold"),
    "btn_sm":   (FONT_FAMILY, 10),
    "badge":    (FONT_FAMILY, 9, "bold"),
    "phone":    ("Consolas", 22, "bold"),
}


# ─────────────────────────────────────────────
#  Menu data (mirrors the original script)
# ─────────────────────────────────────────────
MENUS = {
    "main": {
        "title": "Airtel Zambia Self-Service",
        "ussd_code": "*117#",
        "options": {
            "1": {"text": "So Che Packs",           "sub": "Voice + SMS + Data combos",            "type": "menu",   "target": "so_che_packs"},
            "2": {"text": "Voice Packs",             "sub": "Standalone voice minute bundles",       "type": "menu",   "target": "voice_packs"},
            "3": {"text": "SMS Packs",               "sub": "Standalone SMS bundles",               "type": "menu",   "target": "sms_packs"},
            "4": {"text": "Data Packs",              "sub": "Internet / Tonse data bundles",         "type": "menu",   "target": "data_packs"},
            "5": {"text": "Buy for Other",           "sub": "Buy any bundle for another subscriber", "type": "menu",   "target": "buy_for_other"},
            "6": {"text": "Check Balance",           "sub": "View all active balances",              "type": "menu",   "target": "check_balance"},
            "7": {"text": "My Account / Settings",   "sub": "Account management & self-care",        "type": "menu",   "target": "my_account"},
            "8": {"text": "Roaming & International", "sub": "International calls and roaming",       "type": "menu",   "target": "roaming"},
            "9": {"text": "More Services",           "sub": "Additional Airtel value-added services","type": "menu",   "target": "more_services"},
            "0": {"text": "Exit",                    "sub": "End session",                           "type": "action", "action": "exit"},
        }
    },
    "so_che_packs": {
        "title": "So Che Packs",
        "description": "Voice + SMS + Data combo bundles",
        "parent": "main",
        "options": {
            "1": {"text": "Airtel Pack (On-Net)",   "sub": "Airtel to Airtel only",       "type": "menu",   "target": "airtel_on_net_pack"},
            "2": {"text": "All-Networks Pack",      "sub": "Calls, SMS, data – any network","type": "menu",   "target": "all_networks_pack"},
            "3": {"text": "Check So Che Balance",   "sub": "",                            "type": "action", "action": "show_balance", "balance_type": "so_che"},
            "4": {"text": "Buy for Another Number", "sub": "",                            "type": "input",  "action": "input_recipient"},
            "0": {"text": "Back",                   "sub": "",                            "type": "action", "action": "back"},
        }
    },
    "airtel_on_net_pack": {
        "title": "Airtel Pack (On-Net)",
        "description": "Calls, SMS, data – Airtel to Airtel only",
        "parent": "so_che_packs",
        "options": {
            "1": {"text": "Daily Pack",   "sub": "24 hrs from time of purchase", "type": "action", "action": "purchase", "bundle_type": "Airtel On-Net Pack", "validity": "Daily (24 hrs)"},
            "2": {"text": "Weekly Pack",  "sub": "7-day validity",               "type": "action", "action": "purchase", "bundle_type": "Airtel On-Net Pack", "validity": "Weekly (7 days)"},
            "3": {"text": "Monthly Pack", "sub": "30-day validity",              "type": "action", "action": "purchase", "bundle_type": "Airtel On-Net Pack", "validity": "Monthly (30 days)"},
            "0": {"text": "Back", "sub": "", "type": "action", "action": "back"},
        }
    },
    "all_networks_pack": {
        "title": "All-Networks Pack",
        "description": "Calls, SMS, data – any network",
        "parent": "so_che_packs",
        "options": {
            "1": {"text": "Daily Pack",   "sub": "24 hrs", "type": "action", "action": "purchase", "bundle_type": "All-Networks Pack", "validity": "Daily (24 hrs)"},
            "2": {"text": "Weekly Pack",  "sub": "7 days", "type": "action", "action": "purchase", "bundle_type": "All-Networks Pack", "validity": "Weekly (7 days)"},
            "3": {"text": "Monthly Pack", "sub": "30 days","type": "action", "action": "purchase", "bundle_type": "All-Networks Pack", "validity": "Monthly (30 days)"},
            "0": {"text": "Back", "sub": "", "type": "action", "action": "back"},
        }
    },
    "voice_packs": {
        "title": "Voice Packs",
        "description": "Standalone voice minute bundles",
        "parent": "main",
        "options": {
            "1": {"text": "Airtel Voice Pack (On-Net)", "sub": "", "type": "menu",   "target": "airtel_voice_pack"},
            "2": {"text": "All-Networks Voice Pack",    "sub": "", "type": "menu",   "target": "all_networks_voice_pack"},
            "3": {"text": "Check Voice Balance",        "sub": "", "type": "action", "action": "show_balance", "balance_type": "voice"},
            "0": {"text": "Back", "sub": "", "type": "action", "action": "back"},
        }
    },
    "airtel_voice_pack": {
        "title": "Airtel Voice Pack (On-Net)",
        "parent": "voice_packs",
        "options": {
            "1": {"text": "Daily",   "sub": "", "type": "action", "action": "purchase", "bundle_type": "Airtel Voice Pack (On-Net)", "validity": "Daily"},
            "2": {"text": "Weekly",  "sub": "", "type": "action", "action": "purchase", "bundle_type": "Airtel Voice Pack (On-Net)", "validity": "Weekly"},
            "3": {"text": "Monthly", "sub": "", "type": "action", "action": "purchase", "bundle_type": "Airtel Voice Pack (On-Net)", "validity": "Monthly"},
            "0": {"text": "Back", "sub": "", "type": "action", "action": "back"},
        }
    },
    "all_networks_voice_pack": {
        "title": "All-Networks Voice Pack",
        "parent": "voice_packs",
        "options": {
            "1": {"text": "Daily",   "sub": "", "type": "action", "action": "purchase", "bundle_type": "All-Networks Voice Pack", "validity": "Daily"},
            "2": {"text": "Weekly",  "sub": "", "type": "action", "action": "purchase", "bundle_type": "All-Networks Voice Pack", "validity": "Weekly"},
            "3": {"text": "Monthly", "sub": "", "type": "action", "action": "purchase", "bundle_type": "All-Networks Voice Pack", "validity": "Monthly"},
            "0": {"text": "Back", "sub": "", "type": "action", "action": "back"},
        }
    },
    "sms_packs": {
        "title": "SMS Packs",
        "description": "Standalone SMS bundles",
        "parent": "main",
        "options": {
            "1": {"text": "Airtel SMS Pack (On-Net)", "sub": "", "type": "menu",   "target": "airtel_sms_pack"},
            "2": {"text": "All-Networks SMS Pack",    "sub": "", "type": "menu",   "target": "all_networks_sms_pack"},
            "3": {"text": "Check SMS Balance",        "sub": "", "type": "action", "action": "show_balance", "balance_type": "sms"},
            "0": {"text": "Back", "sub": "", "type": "action", "action": "back"},
        }
    },
    "airtel_sms_pack": {
        "title": "Airtel SMS Pack (On-Net)",
        "parent": "sms_packs",
        "options": {
            "1": {"text": "Daily",   "sub": "", "type": "action", "action": "purchase", "bundle_type": "Airtel SMS Pack (On-Net)", "validity": "Daily"},
            "2": {"text": "Weekly",  "sub": "", "type": "action", "action": "purchase", "bundle_type": "Airtel SMS Pack (On-Net)", "validity": "Weekly"},
            "3": {"text": "Monthly", "sub": "", "type": "action", "action": "purchase", "bundle_type": "Airtel SMS Pack (On-Net)", "validity": "Monthly"},
            "0": {"text": "Back", "sub": "", "type": "action", "action": "back"},
        }
    },
    "all_networks_sms_pack": {
        "title": "All-Networks SMS Pack",
        "parent": "sms_packs",
        "options": {
            "1": {"text": "Daily",   "sub": "", "type": "action", "action": "purchase", "bundle_type": "All-Networks SMS Pack", "validity": "Daily"},
            "2": {"text": "Weekly",  "sub": "", "type": "action", "action": "purchase", "bundle_type": "All-Networks SMS Pack", "validity": "Weekly"},
            "3": {"text": "Monthly", "sub": "", "type": "action", "action": "purchase", "bundle_type": "All-Networks SMS Pack", "validity": "Monthly"},
            "0": {"text": "Back", "sub": "", "type": "action", "action": "back"},
        }
    },
    "data_packs": {
        "title": "Data Packs",
        "description": "Internet / Tonse data bundles",
        "parent": "main",
        "options": {
            "1": {"text": "Buy Data Bundle",  "sub": "Tonse bundles – daily/weekly/monthly",    "type": "menu",   "target": "buy_data_bundle"},
            "2": {"text": "Data Me2U",        "sub": "Share data to another Airtel number",     "type": "menu",   "target": "data_me2u"},
            "3": {"text": "Night Data Pack",  "sub": "1.5 GB midnight–5 AM for K5",             "type": "action", "action": "purchase", "bundle_type": "Night Data Pack", "validity": "Nightly"},
            "4": {"text": "Check Data Balance","sub": "",                                        "type": "action", "action": "show_balance", "balance_type": "data"},
            "0": {"text": "Back", "sub": "", "type": "action", "action": "back"},
        }
    },
    "buy_data_bundle": {
        "title": "Buy Data Bundle",
        "description": "Tonse bundles – daily / weekly / monthly",
        "parent": "data_packs",
        "options": {
            "1": {"text": "Daily Data",   "sub": "Short-validity packs", "type": "action", "action": "purchase", "bundle_type": "Tonse Daily Data",   "validity": "Daily"},
            "2": {"text": "Weekly Data",  "sub": "",                     "type": "action", "action": "purchase", "bundle_type": "Tonse Weekly Data",  "validity": "Weekly"},
            "3": {"text": "Monthly Data", "sub": "",                     "type": "action", "action": "purchase", "bundle_type": "Tonse Monthly Data", "validity": "Monthly"},
            "0": {"text": "Back", "sub": "", "type": "action", "action": "back"},
        }
    },
    "data_me2u": {
        "title": "Data Me2U",
        "description": "Transfer data to another Airtel number",
        "parent": "data_packs",
        "options": {
            "1": {"text": "Send Data",            "sub": "Enter recipient number + amount", "type": "action", "action": "send_data"},
            "2": {"text": "Check Transfer History","sub": "",                               "type": "action", "action": "show_transfer_history"},
            "3": {"text": "Buy for Other",        "sub": "Choose bundle for another number","type": "menu",   "target": "buy_data_for_other"},
            "0": {"text": "Back", "sub": "", "type": "action", "action": "back"},
        }
    },
    "buy_data_for_other": {
        "title": "Buy Data for Other",
        "parent": "data_me2u",
        "options": {
            "1": {"text": "Daily Data",   "sub": "", "type": "action", "action": "purchase", "bundle_type": "Tonse Daily Data (Other)",   "validity": "Daily"},
            "2": {"text": "Weekly Data",  "sub": "", "type": "action", "action": "purchase", "bundle_type": "Tonse Weekly Data (Other)",  "validity": "Weekly"},
            "3": {"text": "Monthly Data", "sub": "", "type": "action", "action": "purchase", "bundle_type": "Tonse Monthly Data (Other)", "validity": "Monthly"},
            "0": {"text": "Back", "sub": "", "type": "action", "action": "back"},
        }
    },
    "check_balance": {
        "title": "Check Balance",
        "description": "View all active balances",
        "parent": "main",
        "options": {
            "1": {"text": "Airtime Balance",      "sub": "",                              "type": "action", "action": "show_balance", "balance_type": "airtime"},
            "2": {"text": "Voice Minutes Balance","sub": "",                              "type": "action", "action": "show_balance", "balance_type": "voice_minutes"},
            "3": {"text": "SMS Balance",          "sub": "",                              "type": "action", "action": "show_balance", "balance_type": "sms"},
            "4": {"text": "Data Balance",         "sub": "All active Tonse bundles",      "type": "action", "action": "show_balance", "balance_type": "data"},
            "5": {"text": "All Balances Summary", "sub": "",                              "type": "action", "action": "show_balance", "balance_type": "all"},
            "0": {"text": "Back", "sub": "", "type": "action", "action": "back"},
        }
    },
    "my_account": {
        "title": "My Account / Settings",
        "description": "Account management & self-care",
        "parent": "main",
        "options": {
            "1": {"text": "View Registered Details",  "sub": "",                          "type": "action", "action": "view_details"},
            "2": {"text": "Auto-Renewal Settings",    "sub": "Manage recurring renewal",  "type": "action", "action": "manage_auto_renewal"},
            "3": {"text": "SIM Swap (Self-Service)",  "sub": "Also: *537#",               "type": "action", "action": "sim_swap"},
            "4": {"text": "Manage Do Not Disturb",    "sub": "DND settings",              "type": "action", "action": "manage_dnd"},
            "5": {"text": "Opt In / Out of Promos",   "sub": "",                          "type": "action", "action": "promo_settings"},
            "0": {"text": "Back", "sub": "", "type": "action", "action": "back"},
        }
    },
    "roaming": {
        "title": "Roaming & International",
        "description": "International calls and roaming services",
        "parent": "main",
        "options": {
            "1": {"text": "International Call Bundles","sub": "Discounted bundles to specific countries", "type": "menu",   "target": "intl_call_bundles"},
            "2": {"text": "Roaming Options",           "sub": "View/activate roaming while abroad",      "type": "action", "action": "roaming_options"},
            "3": {"text": "International Calling Rates","sub": "",                                        "type": "action", "action": "intl_rates"},
            "0": {"text": "Back", "sub": "", "type": "action", "action": "back"},
        }
    },
    "intl_call_bundles": {
        "title": "International Call Bundles",
        "description": "Discounted bundles to specific countries",
        "parent": "roaming",
        "options": {
            "1": {"text": "Buy International Bundle",   "sub": "", "type": "action", "action": "purchase",      "bundle_type": "International Call Bundle", "validity": "Variable"},
            "2": {"text": "Check International Balance","sub": "", "type": "action", "action": "show_balance",  "balance_type": "international"},
            "0": {"text": "Back", "sub": "", "type": "action", "action": "back"},
        }
    },
    "more_services": {
        "title": "More Services",
        "description": "Additional Airtel value-added services",
        "parent": "main",
        "options": {
            "1": {"text": "Caller Tunes / Hello Tunes", "sub": "Also: *455#",       "type": "action", "action": "caller_tunes"},
            "2": {"text": "Airtel Football",            "sub": "Also: *440#",       "type": "action", "action": "airtel_football"},
            "3": {"text": "International Voice Calling","sub": "",                   "type": "action", "action": "intl_voice_calling"},
            "4": {"text": "Airtime Siliza (Borrow)",    "sub": "Also: *458#",       "type": "action", "action": "airtime_siliza"},
            "5": {"text": "Airtel Money Link",          "sub": "*115# or *774#",    "type": "action", "action": "airtel_money"},
            "0": {"text": "Back", "sub": "", "type": "action", "action": "back"},
        }
    },
    "buy_for_other": {
        "title": "Buy for Other",
        "description": "Buy any bundle for another subscriber",
        "parent": "main",
        "options": {
            "1": {"text": "So Che Pack",         "sub": "", "type": "menu", "target": "so_che_packs"},
            "2": {"text": "Voice Pack",          "sub": "", "type": "menu", "target": "voice_packs"},
            "3": {"text": "Tonse Internet Bundle","sub": "", "type": "menu", "target": "data_packs"},
            "4": {"text": "SMS Pack",            "sub": "", "type": "menu", "target": "sms_packs"},
            "0": {"text": "Back", "sub": "", "type": "action", "action": "back"},
        }
    },
}

BALANCES = {
    "airtime":      {"title": "Airtime Balance",          "rows": [("Current Balance", "K150.50")]},
    "voice":        {"title": "Voice Minutes Balance",    "rows": [("Available Minutes", "250 mins"), ("Expiry Date", "30 Apr 2026")]},
    "voice_minutes":{"title": "Voice Minutes Balance",    "rows": [("Available Minutes", "250 mins"), ("Expiry Date", "30 Apr 2026")]},
    "sms":          {"title": "SMS Balance",              "rows": [("Available SMS", "100 SMS"),     ("Expiry Date", "30 Apr 2026")]},
    "data":         {"title": "Data Balance",             "rows": [("Available Data", "5.2 GB"),     ("Bundle Type", "Monthly Tonse"),  ("Expiry Date", "15 May 2026")]},
    "so_che":       {"title": "So Che Pack Balance",      "rows": [("Voice Minutes", "500 mins"),    ("SMS", "200 SMS"),                ("Data", "2 GB"),               ("Expiry Date", "15 May 2026")]},
    "international":{"title": "International Balance",    "rows": [("Current Balance", "K0.00"),     ("Status", "No active bundles")]},
    "all":          {"title": "Complete Account Summary", "rows": [("Airtime", "K150.50"), ("Voice Minutes", "250 mins"), ("SMS", "100 SMS"), ("Data", "5.2 GB"), ("So Che Pack", "500 mins + 200 SMS + 2 GB"), ("International", "K0.00")]},
}


# ─────────────────────────────────────────────
#  Helper: rounded rectangle on Canvas
# ─────────────────────────────────────────────
def rounded_rect(canvas, x1, y1, x2, y2, r=12, **kwargs):
    pts = [
        x1+r, y1,
        x2-r, y1,
        x2, y1,
        x2, y1+r,
        x2, y2-r,
        x2, y2,
        x2-r, y2,
        x1+r, y2,
        x1, y2,
        x1, y2-r,
        x1, y1+r,
        x1, y1,
    ]
    return canvas.create_polygon(pts, smooth=True, **kwargs)


# ─────────────────────────────────────────────
#  Main Application
# ─────────────────────────────────────────────
class UssdApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Airtel Zambia   •   *117#   Self-Service Portal")
        self.geometry("520x820")
        self.minsize(480, 720)
        self.configure(bg=COLORS["bg"])
        self.resizable(True, True)

        self.user_number   = tk.StringVar()
        self.current_menu  = "main"
        self.menu_history  = []   # stack of menu names for back navigation
        self.recipient_num = None

        # Custom scrollbar style
        style = ttk.Style(self)
        style.theme_use("clam")
        style.configure("Dark.Vertical.TScrollbar",
                        troughcolor=COLORS["surface"],
                        background=COLORS["border"],
                        bordercolor=COLORS["surface"],
                        arrowcolor=COLORS["text_muted"])

        self._build_ui()
        self._show_login()

    # ── UI skeleton ───────────────────────────
    def _build_ui(self):
        """Create persistent chrome (header) + switchable body frame."""
        self._build_header()

        # Body container — fills remaining space
        self.body = tk.Frame(self, bg=COLORS["bg"])
        self.body.pack(fill="both", expand=True, padx=0, pady=0)

        self._build_status_bar()

    def _build_header(self):
        hdr = tk.Frame(self, bg=COLORS["red_primary"], height=72)
        hdr.pack(fill="x")
        hdr.pack_propagate(False)

        # Logo area
        logo_frame = tk.Frame(hdr, bg=COLORS["red_primary"])
        logo_frame.pack(side="left", padx=18, pady=0, fill="y")

        tk.Label(logo_frame, text="airtel", font=(FONT_FAMILY, 22, "bold"),
                 fg=COLORS["white"], bg=COLORS["red_primary"]).pack(side="left", pady=18)
        tk.Label(logo_frame, text=" zambia", font=(FONT_FAMILY, 12),
                 fg="#FFB3C1", bg=COLORS["red_primary"]).pack(side="left", pady=18)

        # USSD badge
        badge = tk.Label(hdr, text="  *117#  ", font=FONTS["badge"],
                         fg=COLORS["red_primary"], bg=COLORS["white"],
                         relief="flat", cursor="arrow")
        badge.pack(side="right", padx=18, pady=22)

    def _build_status_bar(self):
        self.status_bar = tk.Frame(self, bg=COLORS["surface"], height=28)
        self.status_bar.pack(fill="x", side="bottom")
        self.status_bar.pack_propagate(False)

        self.status_lbl = tk.Label(self.status_bar, text="Not connected",
                                   font=FONTS["body_sm"],
                                   fg=COLORS["text_dim"], bg=COLORS["surface"])
        self.status_lbl.pack(side="left", padx=12)

        self.clock_lbl = tk.Label(self.status_bar, text="",
                                  font=FONTS["body_sm"],
                                  fg=COLORS["text_dim"], bg=COLORS["surface"])
        self.clock_lbl.pack(side="right", padx=12)
        self._tick_clock()

    def _tick_clock(self):
        self.clock_lbl.config(text=datetime.now().strftime("%H:%M:%S"))
        self.after(1000, self._tick_clock)

    def _set_status(self, text, color=None):
        self.status_lbl.config(text=text, fg=color or COLORS["text_muted"])

    # ── Screen switcher ───────────────────────
    def _clear_body(self):
        for w in self.body.winfo_children():
            w.destroy()

    # ═══════════════════════════════════════════
    #  LOGIN SCREEN
    # ═══════════════════════════════════════════
    def _show_login(self):
        self._clear_body()
        self._set_status("Enter your phone number to begin")

        outer = tk.Frame(self.body, bg=COLORS["bg"])
        outer.pack(expand=True, fill="both")

        # Card
        card = tk.Frame(outer, bg=COLORS["card"],
                        highlightbackground=COLORS["border"],
                        highlightthickness=1)
        card.place(relx=0.5, rely=0.5, anchor="center", width=360)

        tk.Label(card, text="Welcome", font=FONTS["title"],
                 fg=COLORS["white"], bg=COLORS["card"]).pack(pady=(32, 4))
        tk.Label(card, text="Airtel Zambia Self-Service Portal",
                 font=FONTS["subtitle"], fg=COLORS["text_muted"],
                 bg=COLORS["card"]).pack()

        # Divider
        tk.Frame(card, bg=COLORS["border"], height=1).pack(fill="x", padx=24, pady=20)

        tk.Label(card, text="Phone Number", font=FONTS["body_sm"],
                 fg=COLORS["text_muted"], bg=COLORS["card"],
                 anchor="w").pack(fill="x", padx=24)

        entry_frame = tk.Frame(card, bg=COLORS["red_primary"], highlightthickness=0)
        entry_frame.pack(fill="x", padx=24, pady=(6, 0))

        # prefix label
        tk.Label(entry_frame, text="+260", font=FONTS["body"],
                 fg=COLORS["white"], bg=COLORS["red_primary"],
                 padx=8).pack(side="left")

        self._phone_entry = tk.Entry(
            entry_frame, textvariable=self.user_number,
            font=FONTS["body"], bg=COLORS["input_bg"],
            fg=COLORS["white"], insertbackground=COLORS["white"],
            relief="flat", bd=0, width=20
        )
        self._phone_entry.pack(side="left", fill="both", expand=True,
                               ipady=10, padx=(0, 4))
        self._phone_entry.bind("<Return>", lambda e: self._do_login())
        self._phone_entry.focus_set()

        self.login_err = tk.Label(card, text="", font=FONTS["body_sm"],
                                  fg=COLORS["red_primary"], bg=COLORS["card"])
        self.login_err.pack(pady=(6, 0))

        # Connect button
        self._make_button(card, "  Connect to *117#  ", self._do_login,
                          primary=True).pack(fill="x", padx=24, pady=(16, 32))

    def _do_login(self):
        phone = self.user_number.get().strip().replace(" ", "").replace("-", "")
        if len(phone) < 9 or not phone.isdigit():
            self.login_err.config(text="⚠ Please enter a valid Zambian number")
            return
        self.login_err.config(text="")
        self._set_status(f"Connected: {phone}", COLORS["green"])
        self._show_menu("main")

    # ═══════════════════════════════════════════
    #  MENU SCREEN
    # ═══════════════════════════════════════════
    def _show_menu(self, menu_key):
        self.current_menu = menu_key
        self._clear_body()

        menu = MENUS[menu_key]
        options = menu.get("options", {})

        # ── Breadcrumb bar ──
        self._build_breadcrumb(menu)

        # ── Scrollable options list ──
        container = tk.Frame(self.body, bg=COLORS["bg"])
        container.pack(fill="both", expand=True, padx=0, pady=0)

        canvas = tk.Canvas(container, bg=COLORS["bg"], highlightthickness=0, bd=0)
        scrollbar = ttk.Scrollbar(container, orient="vertical",
                                  command=canvas.yview,
                                  style="Dark.Vertical.TScrollbar")
        canvas.configure(yscrollcommand=scrollbar.set)

        scrollbar.pack(side="right", fill="y")
        canvas.pack(side="left", fill="both", expand=True)

        inner = tk.Frame(canvas, bg=COLORS["bg"])
        win_id = canvas.create_window((0, 0), window=inner, anchor="nw")

        def on_configure(event):
            canvas.configure(scrollregion=canvas.bbox("all"))
            canvas.itemconfig(win_id, width=canvas.winfo_width())

        inner.bind("<Configure>", on_configure)
        canvas.bind("<Configure>", lambda e: canvas.itemconfig(win_id, width=e.width))
        canvas.bind_all("<MouseWheel>", lambda e: canvas.yview_scroll(-1*(e.delta//120), "units"))

        # Render options
        if isinstance(options, dict):
            sorted_keys = sorted(options.keys(), key=lambda k: (k == "0", k))
            for key in sorted_keys:
                opt = options[key]
                self._build_menu_item(inner, key, opt)
        
        # Bottom padding
        tk.Frame(inner, bg=COLORS["bg"], height=16).pack()

    def _build_breadcrumb(self, menu):
        bar = tk.Frame(self.body, bg=COLORS["surface"], height=48)
        bar.pack(fill="x")
        bar.pack_propagate(False)

        # Back button (if not main)
        if menu.get("parent"):
            back_btn = tk.Label(bar, text="◀  Back", font=FONTS["body_sm"],
                                fg=COLORS["red_primary"], bg=COLORS["surface"],
                                cursor="hand2")
            back_btn.pack(side="left", padx=14)
            back_btn.bind("<Button-1>", lambda e: self._go_back())

        title_txt = menu.get("title", "Menu")
        tk.Label(bar, text=title_txt, font=FONTS["heading"],
                 fg=COLORS["white"], bg=COLORS["surface"]).pack(side="left", padx=14)

        description = menu.get("description", "")
        if description:
            tk.Label(bar, text=description, font=FONTS["body_sm"],
                     fg=COLORS["text_dim"], bg=COLORS["surface"]).pack(side="left")

        # Phone badge (top right)
        phone = self.user_number.get()
        if phone:
            tk.Label(bar, text=f"📱 {phone}", font=FONTS["body_sm"],
                     fg=COLORS["cyan"], bg=COLORS["surface"]).pack(side="right", padx=14)

    def _build_menu_item(self, parent, key, opt):
        is_back = (key == "0")
        is_exit = (opt.get("action") == "exit")

        # Outer wrapper with padding
        wrapper = tk.Frame(parent, bg=COLORS["bg"])
        wrapper.pack(fill="x", padx=12, pady=(0, 6))

        # Card
        card_bg = COLORS["surface"] if not is_back else COLORS["bg"]
        border  = COLORS["border"]
        if is_exit:
            border = COLORS["red_dark"]

        card = tk.Frame(wrapper, bg=card_bg,
                        highlightbackground=border,
                        highlightthickness=1,
                        cursor="hand2")
        card.pack(fill="x")

        # Key badge
        badge_bg = COLORS["red_primary"] if not is_back else COLORS["border"]
        badge_fg = COLORS["white"]
        badge = tk.Label(card, text=f" {key} ", font=FONTS["badge"],
                         fg=badge_fg, bg=badge_bg, width=2)
        badge.pack(side="left", padx=(10, 0), pady=12)

        # Text area
        txt_frame = tk.Frame(card, bg=card_bg)
        txt_frame.pack(side="left", fill="both", expand=True, padx=12, pady=10)

        text_color = COLORS["text_muted"] if is_back else COLORS["text"]
        tk.Label(txt_frame, text=opt["text"], font=FONTS["body"],
                 fg=text_color, bg=card_bg, anchor="w").pack(fill="x")

        sub = opt.get("sub", "")
        if sub and not is_back:
            tk.Label(txt_frame, text=sub, font=FONTS["body_sm"],
                     fg=COLORS["text_dim"], bg=card_bg, anchor="w").pack(fill="x")

        # Arrow
        if not is_back and not is_exit:
            arrow_color = COLORS["text_dim"]
            if opt.get("type") == "menu":
                arrow_color = COLORS["red_primary"]
            tk.Label(card, text="›", font=(FONT_FAMILY, 18),
                     fg=arrow_color, bg=card_bg).pack(side="right", padx=12)

        # Hover effects
        def on_enter(e, c=card, cb=card_bg):
            c.config(bg=COLORS["card"] if cb == COLORS["surface"] else COLORS["surface"])
            for ch in c.winfo_children():
                try:
                    ch.config(bg=c["bg"])
                    for gc in ch.winfo_children():
                        try: gc.config(bg=c["bg"])
                        except: pass
                except: pass

        def on_leave(e, c=card, cb=card_bg):
            c.config(bg=cb)
            for ch in c.winfo_children():
                try:
                    ch.config(bg=cb)
                    for gc in ch.winfo_children():
                        try: gc.config(bg=cb)
                        except: pass
                except: pass

        card.bind("<Enter>", on_enter)
        card.bind("<Leave>", on_leave)
        for widget in card.winfo_children():
            widget.bind("<Enter>", on_enter)
            widget.bind("<Leave>", on_leave)

        # Click handler
        def on_click(e, o=opt):
            self._handle_option(o)

        card.bind("<Button-1>", on_click)
        for widget in card.winfo_children():
            widget.bind("<Button-1>", on_click)
            for gc in widget.winfo_children():
                gc.bind("<Button-1>", on_click)

    # ─────────────────────────────────────────────
    def _handle_option(self, opt):
        opt_type = opt.get("type")
        if opt_type == "menu":
            self.menu_history.append(self.current_menu)
            self._show_menu(opt["target"])
        elif opt_type == "action":
            action = opt.get("action")
            if action == "exit":
                self._do_exit()
            elif action == "back":
                self._go_back()
            elif action == "purchase":
                self._show_purchase(opt)
            elif action == "show_balance":
                self._show_balance(opt.get("balance_type"))
            elif action == "send_data":
                self._show_send_data()
            elif action == "show_transfer_history":
                self._show_info_screen("Data Transfer History", [("Status", "No recent transfers.", COLORS["text_muted"])], icon="📂")
            elif action == "view_details":
                self._show_account_details()
            elif action == "manage_auto_renewal":
                self._show_toggle_screen("Auto-Renewal Settings",
                    ["Enable auto-renewal", "Disable auto-renewal", "View active auto-renewals"])
            elif action == "sim_swap":
                self._show_info_screen("SIM Swap – Self Service",
                    [
                        ("ℹ", "This service requires identity verification.", COLORS["yellow"]),
                        ("📞", "Contact Airtel Care: 193", COLORS["cyan"]),
                        ("🌐", "Or visit: www.airtel.zm", COLORS["cyan"]),
                        ("📱", "Alternative USSD code: *537#", COLORS["text_muted"]),
                    ], icon="🔒")
            elif action == "manage_dnd":
                self._show_toggle_screen("Do Not Disturb (DND)",
                    ["Enable DND", "Disable DND", "Check DND status"])
            elif action == "promo_settings":
                self._show_toggle_screen("Promotional Settings",
                    ["Opt in to promotional offers", "Opt out from promotional offers"])
            elif action == "caller_tunes":
                self._show_info_screen("Caller Tunes / Hello Tunes",
                    [("📱", "Personalize what callers hear when they call you.", COLORS["text"]),
                     ("🎵", "Direct USSD code: *455#", COLORS["cyan"])], icon="🎵")
            elif action == "airtel_football":
                self._show_toggle_screen("Airtel Football",
                    ["View match schedules", "Check live scores", "Subscribe to match alerts"],
                    extra_info="Direct USSD code: *440#")
            elif action == "intl_voice_calling":
                self._show_intl_rates_screen("International Calling Rates",
                    [("USA", "K2.50/min"), ("UK", "K2.00/min"), ("South Africa", "K1.50/min"),
                     ("India", "K1.50/min"), ("Australia", "K3.00/min"), ("Canada", "K2.50/min"),
                     ("Germany", "K2.20/min")])
            elif action == "airtime_siliza":
                self._show_info_screen("Airtime Siliza – Borrow Airtime",
                    [("💡", "Borrow airtime and repay within 7 days.", COLORS["text"]),
                     ("📱", "Direct USSD code: *458#", COLORS["cyan"]),
                     ("✅", "Representative APR: 0% (T&C apply)", COLORS["green"])], icon="💳")
            elif action == "airtel_money":
                self._show_info_screen("Airtel Money Link",
                    [("💰", "Send & receive money, pay bills, buy goods.", COLORS["text"]),
                     ("📱", "Dial *115# or *774#", COLORS["cyan"]),
                     ("🕐", "Available 24/7", COLORS["green"])], icon="💰")
            elif action == "roaming_options":
                self._show_toggle_screen("Roaming Options",
                    ["Enable roaming", "Disable roaming", "View roaming packages"])
            elif action == "intl_rates":
                self._show_intl_rates_screen("International Calling Rates",
                    [("USA", "K2.50/min"), ("UK", "K2.00/min"), ("South Africa", "K1.50/min"),
                     ("India", "K1.50/min"), ("Australia", "K3.00/min"), ("Canada", "K2.50/min"),
                     ("Germany", "K2.20/min")])
            elif action == "input_recipient":
                self._show_recipient_input()
        elif opt_type == "input":
            self._show_recipient_input()

    def _go_back(self):
        if self.menu_history:
            prev = self.menu_history.pop()
            self.current_menu = prev
            self._show_menu(prev)
        else:
            self._show_menu("main")

    # ═══════════════════════════════════════════
    #  PURCHASE SCREEN
    # ═══════════════════════════════════════════
    def _show_purchase(self, opt):
        self._clear_body()
        bundle = opt.get("bundle_type", "Bundle")
        validity = opt.get("validity", "—")

        # Breadcrumb
        bar = tk.Frame(self.body, bg=COLORS["surface"], height=48)
        bar.pack(fill="x")
        bar.pack_propagate(False)
        back_lbl = tk.Label(bar, text="◀  Back", font=FONTS["body_sm"],
                            fg=COLORS["red_primary"], bg=COLORS["surface"], cursor="hand2")
        back_lbl.pack(side="left", padx=14, pady=14)
        back_lbl.bind("<Button-1>", lambda e: self._show_menu(self.current_menu))
        tk.Label(bar, text="Purchase Bundle", font=FONTS["heading"],
                 fg=COLORS["white"], bg=COLORS["surface"]).pack(side="left", padx=6)

        scroll_frame = self._make_scrollable_frame(self.body)
        inner = scroll_frame

        # ── Bundle details card ──
        card = tk.Frame(inner, bg=COLORS["card"],
                        highlightbackground=COLORS["border"], highlightthickness=1)
        card.pack(fill="x", padx=14, pady=(14, 6))

        tk.Label(card, text="Bundle Details", font=FONTS["heading"],
                 fg=COLORS["white"], bg=COLORS["card"]).pack(anchor="w", padx=16, pady=(14, 4))
        tk.Frame(card, bg=COLORS["border"], height=1).pack(fill="x", padx=16)

        def row(lbl, val, vc=COLORS["cyan"]):
            f = tk.Frame(card, bg=COLORS["card"])
            f.pack(fill="x", padx=16, pady=4)
            tk.Label(f, text=lbl, font=FONTS["body_sm"], fg=COLORS["text_muted"],
                     bg=COLORS["card"], width=14, anchor="w").pack(side="left")
            tk.Label(f, text=val, font=FONTS["body"], fg=vc,
                     bg=COLORS["card"], anchor="w").pack(side="left")

        row("Bundle:", bundle)
        row("Validity:", validity, COLORS["yellow"])
        tk.Frame(card, bg=COLORS["card"], height=10).pack()

        # ── Payment method ──
        tk.Label(inner, text="Select Payment Method", font=FONTS["heading"],
                 fg=COLORS["white"], bg=COLORS["bg"]).pack(anchor="w", padx=14, pady=(14, 6))

        self._pay_var = tk.StringVar(value="")
        methods = [("1", "Airtime", "K5 – K100"), ("2", "Airtel Money", "Instant"), ("3", "Debit Card", "Visa / Mastercard")]

        for key, name, detail in methods:
            self._build_radio_card(inner, key, name, detail, self._pay_var)

        # ── Confirm button ──
        self.purchase_msg = tk.Label(inner, text="", font=FONTS["body_sm"],
                                     fg=COLORS["green"], bg=COLORS["bg"],
                                     wraplength=380, justify="center")
        self.purchase_msg.pack(pady=(10, 0))

        btn_frame = tk.Frame(inner, bg=COLORS["bg"])
        btn_frame.pack(fill="x", padx=14, pady=(8, 24))

        self._make_button(btn_frame, "  Confirm Purchase  ",
                          lambda: self._do_purchase(bundle, validity),
                          primary=True).pack(side="left", expand=True, fill="x", padx=(0, 4))
        self._make_button(btn_frame, "Cancel",
                          lambda: self._show_menu(self.current_menu),
                          primary=False).pack(side="left", expand=True, fill="x", padx=(4, 0))

    def _build_radio_card(self, parent, key, name, detail, var):
        card = tk.Frame(parent, bg=COLORS["card"],
                        highlightbackground=COLORS["border"],
                        highlightthickness=1, cursor="hand2")
        card.pack(fill="x", padx=14, pady=3)

        rb = tk.Radiobutton(card, variable=var, value=key,
                            bg=COLORS["card"], activebackground=COLORS["card"],
                            selectcolor=COLORS["red_primary"],
                            fg=COLORS["text"])
        rb.pack(side="left", padx=10, pady=10)

        tk.Label(card, text=name, font=FONTS["body"], fg=COLORS["text"],
                 bg=COLORS["card"]).pack(side="left")
        tk.Label(card, text=f"  ({detail})", font=FONTS["body_sm"],
                 fg=COLORS["text_dim"], bg=COLORS["card"]).pack(side="left")

        card.bind("<Button-1>", lambda e: var.set(key))

    def _do_purchase(self, bundle, validity):
        method = self._pay_var.get()
        if not method:
            self.purchase_msg.config(text="⚠ Please select a payment method.", fg=COLORS["yellow"])
            return
        methods = {"1": "Airtime", "2": "Airtel Money", "3": "Debit Card"}

        method_name = methods[method]

        if method == "2": # Airtel Money
            self.purchase_msg.config(text=f"📲 Sending payment request to {self.user_number.get()}...", fg=COLORS["cyan"])
            self.update()
            time.sleep(1)

            pin = simpledialog.askstring("Airtel Money PIN",
                                         f"Enter 4-digit PIN to pay for:\n{bundle}\n\n(Sent to {self.user_number.get()})",
                                         parent=self, show='*')

            if pin and len(pin) == 4 and pin.isdigit():
                self.purchase_msg.config(text="⌛ Verifying PIN...", fg=COLORS["yellow"])
                self.update()
                time.sleep(1)
            else:
                self.purchase_msg.config(text="❌ Invalid PIN or Transaction Cancelled.", fg=COLORS["red_primary"])
                return

        success_text = f"✅  Payment via {method_name} successful!\n"
        success_text += f"Bundle '{bundle}' activated for {validity}."
        if self.recipient_num:
            success_text += f"\nRecipient: {self.recipient_num}"

        self.purchase_msg.config(text=success_text, fg=COLORS["green"])
        self._set_status(f"Bundle activated: {bundle}", COLORS["green"])
        self.recipient_num = None

    # ═══════════════════════════════════════════
    #  BALANCE SCREEN
    # ═══════════════════════════════════════════
    def _show_balance(self, balance_type):
        info = BALANCES.get(balance_type)
        if not info:
            messagebox.showwarning("Balance", "Balance information unavailable.")
            return

        self._clear_body()
        self._build_back_bar(info["title"])

        scroll_frame = self._make_scrollable_frame(self.body)

        # Header card
        hdr_card = tk.Frame(scroll_frame, bg=COLORS["red_primary"])
        hdr_card.pack(fill="x", padx=14, pady=(14, 0))
        tk.Label(hdr_card, text="💰 " + info["title"], font=FONTS["heading"],
                 fg=COLORS["white"], bg=COLORS["red_primary"]).pack(
                     anchor="w", padx=16, pady=12)

        # Data rows
        data_card = tk.Frame(scroll_frame, bg=COLORS["card"],
                             highlightbackground=COLORS["border"], highlightthickness=1)
        data_card.pack(fill="x", padx=14, pady=0)

        for label, value in info["rows"]:
            row = tk.Frame(data_card, bg=COLORS["card"])
            row.pack(fill="x", padx=16, pady=8)
            tk.Label(row, text=label, font=FONTS["body_sm"],
                     fg=COLORS["text_muted"], bg=COLORS["card"],
                     width=22, anchor="w").pack(side="left")
            tk.Label(row, text=value, font=FONTS["body"],
                     fg=COLORS["yellow"], bg=COLORS["card"],
                     anchor="w").pack(side="left")
            tk.Frame(data_card, bg=COLORS["border"], height=1).pack(fill="x", padx=16)

        # Last updated
        tk.Label(scroll_frame, text=f"Last updated: {datetime.now().strftime('%H:%M:%S')}",
                 font=FONTS["body_sm"], fg=COLORS["text_dim"],
                 bg=COLORS["bg"]).pack(pady=10)

    # ═══════════════════════════════════════════
    #  SEND DATA SCREEN
    # ═══════════════════════════════════════════
    def _show_send_data(self):
        self._clear_body()
        self._build_back_bar("Data Me2U – Send Data")

        inner = self._make_scrollable_frame(self.body)

        card = tk.Frame(inner, bg=COLORS["card"],
                        highlightbackground=COLORS["border"], highlightthickness=1)
        card.pack(fill="x", padx=14, pady=14)

        tk.Label(card, text="📡 Transfer Data to Another Number",
                 font=FONTS["heading"], fg=COLORS["white"],
                 bg=COLORS["card"]).pack(anchor="w", padx=16, pady=(14, 4))
        tk.Frame(card, bg=COLORS["border"], height=1).pack(fill="x", padx=16, pady=(0, 10))

        def labeled_entry(parent, label, var):
            tk.Label(parent, text=label, font=FONTS["body_sm"],
                     fg=COLORS["text_muted"], bg=COLORS["card"],
                     anchor="w").pack(fill="x", padx=16)
            e = tk.Entry(parent, textvariable=var, font=FONTS["body"],
                         bg=COLORS["input_bg"], fg=COLORS["white"],
                         insertbackground=COLORS["white"], relief="flat", bd=0)
            e.pack(fill="x", padx=16, pady=(4, 12), ipady=8)
            return e

        recip_var = tk.StringVar()
        amt_var   = tk.StringVar()
        labeled_entry(card, "Recipient Airtel Number", recip_var)
        labeled_entry(card, "Amount (GB)", amt_var)

        msg_lbl = tk.Label(card, text="", font=FONTS["body_sm"],
                           fg=COLORS["green"], bg=COLORS["card"])
        msg_lbl.pack(pady=(0, 4))

        def do_send():
            r = recip_var.get().strip().replace(" ", "").replace("-", "")
            a = amt_var.get().strip()
            if len(r) < 9 or not r.isdigit():
                msg_lbl.config(text="⚠ Invalid phone number.", fg=COLORS["yellow"])
                return
            if not a:
                msg_lbl.config(text="⚠ Enter amount to send.", fg=COLORS["yellow"])
                return
            msg_lbl.config(
                text=f"✅  {a} GB transferred to {r} successfully!",
                fg=COLORS["green"])

        self._make_button(card, "  Send Data  ", do_send, primary=True).pack(
            fill="x", padx=16, pady=(4, 16))

    # ═══════════════════════════════════════════
    #  ACCOUNT DETAILS SCREEN
    # ═══════════════════════════════════════════
    def _show_account_details(self):
        self._clear_body()
        self._build_back_bar("Account Details")

        inner = self._make_scrollable_frame(self.body)

        # Avatar circle (simulated)
        av = tk.Label(inner, text="👤", font=(FONT_FAMILY, 36),
                      fg=COLORS["red_primary"], bg=COLORS["bg"])
        av.pack(pady=(20, 4))

        phone = self.user_number.get()
        tk.Label(inner, text=phone, font=FONTS["phone"],
                 fg=COLORS["white"], bg=COLORS["bg"]).pack()

        card = tk.Frame(inner, bg=COLORS["card"],
                        highlightbackground=COLORS["border"], highlightthickness=1)
        card.pack(fill="x", padx=14, pady=14)

        details = [
            ("Phone Number",        phone,        COLORS["cyan"]),
            ("Account Status",      "Active ●",   COLORS["green"]),
            ("Registration Status", "Verified ✓", COLORS["green"]),
            ("Customer Type",       "Prepaid",     COLORS["text"]),
            ("Network",             "Airtel Zambia",COLORS["text"]),
        ]

        for label, value, vc in details:
            row = tk.Frame(card, bg=COLORS["card"])
            row.pack(fill="x", padx=16, pady=8)
            tk.Label(row, text=label, font=FONTS["body_sm"],
                     fg=COLORS["text_muted"], bg=COLORS["card"],
                     width=22, anchor="w").pack(side="left")
            tk.Label(row, text=value, font=FONTS["body"],
                     fg=vc, bg=COLORS["card"], anchor="w").pack(side="left")
            tk.Frame(card, bg=COLORS["border"], height=1).pack(fill="x", padx=16)

    # ═══════════════════════════════════════════
    #  GENERIC TOGGLE SCREEN (settings choices)
    # ═══════════════════════════════════════════
    def _show_toggle_screen(self, title, options, extra_info=None):
        self._clear_body()
        self._build_back_bar(title)

        inner = self._make_scrollable_frame(self.body)

        self._toggle_var = tk.StringVar()
        self._toggle_msg = None

        card = tk.Frame(inner, bg=COLORS["card"],
                        highlightbackground=COLORS["border"], highlightthickness=1)
        card.pack(fill="x", padx=14, pady=14)

        tk.Label(card, text=title, font=FONTS["heading"],
                 fg=COLORS["white"], bg=COLORS["card"]).pack(anchor="w", padx=16, pady=(14, 4))
        tk.Frame(card, bg=COLORS["border"], height=1).pack(fill="x", padx=16, pady=(0, 8))

        for i, opt in enumerate(options, 1):
            self._build_radio_card(card, str(i), opt, "", self._toggle_var)

        if extra_info:
            tk.Label(card, text=extra_info, font=FONTS["body_sm"],
                     fg=COLORS["cyan"], bg=COLORS["card"]).pack(padx=16, pady=(6, 0))

        self._toggle_msg = tk.Label(card, text="", font=FONTS["body_sm"],
                                    fg=COLORS["green"], bg=COLORS["card"])
        self._toggle_msg.pack(pady=(8, 4))

        def confirm():
            if not self._toggle_var.get():
                self._toggle_msg.config(text="⚠ Please make a selection.", fg=COLORS["yellow"])
                return
            chosen = options[int(self._toggle_var.get()) - 1]
            self._toggle_msg.config(text=f"✅  '{chosen}' applied successfully!", fg=COLORS["green"])

        self._make_button(card, "  Apply  ", confirm, primary=True).pack(
            fill="x", padx=16, pady=(0, 16))

    # ═══════════════════════════════════════════
    #  GENERIC INFO SCREEN
    # ═══════════════════════════════════════════
    def _show_info_screen(self, title, rows, icon="ℹ"):
        self._clear_body()
        self._build_back_bar(title)

        inner = self._make_scrollable_frame(self.body)

        tk.Label(inner, text=icon, font=(FONT_FAMILY, 48),
                 fg=COLORS["red_primary"], bg=COLORS["bg"]).pack(pady=(20, 4))

        card = tk.Frame(inner, bg=COLORS["card"],
                        highlightbackground=COLORS["border"], highlightthickness=1)
        card.pack(fill="x", padx=14, pady=10)

        tk.Label(card, text=title, font=FONTS["heading"],
                 fg=COLORS["white"], bg=COLORS["card"]).pack(anchor="w", padx=16, pady=(14, 4))
        tk.Frame(card, bg=COLORS["border"], height=1).pack(fill="x", padx=16, pady=(0, 8))

        for bullet, text, color in rows:
            row = tk.Frame(card, bg=COLORS["card"])
            row.pack(fill="x", padx=16, pady=5)
            tk.Label(row, text=bullet, font=FONTS["body"],
                     fg=COLORS["red_primary"], bg=COLORS["card"],
                     width=3, anchor="w").pack(side="left")
            tk.Label(row, text=text, font=FONTS["body"],
                     fg=color, bg=COLORS["card"],
                     anchor="w", wraplength=340,
                     justify="left").pack(side="left", fill="x", expand=True)

        tk.Frame(card, bg=COLORS["card"], height=14).pack()

    # ═══════════════════════════════════════════
    #  INTL RATES TABLE SCREEN
    # ═══════════════════════════════════════════
    def _show_intl_rates_screen(self, title, rates):
        self._clear_body()
        self._build_back_bar(title)

        inner = self._make_scrollable_frame(self.body)
        tk.Label(inner, text="🌐", font=(FONT_FAMILY, 40),
                 fg=COLORS["red_primary"], bg=COLORS["bg"]).pack(pady=(18, 4))

        card = tk.Frame(inner, bg=COLORS["card"],
                        highlightbackground=COLORS["border"], highlightthickness=1)
        card.pack(fill="x", padx=14, pady=10)

        # header row
        hrow = tk.Frame(card, bg=COLORS["red_dark"])
        hrow.pack(fill="x")
        tk.Label(hrow, text="Country", font=FONTS["body_sm"],
                 fg=COLORS["white"], bg=COLORS["red_dark"],
                 width=20, anchor="w").pack(side="left", padx=16, pady=8)
        tk.Label(hrow, text="Rate", font=FONTS["body_sm"],
                 fg=COLORS["white"], bg=COLORS["red_dark"]).pack(side="left")

        for i, (country, rate) in enumerate(rates):
            row = tk.Frame(card, bg=COLORS["card"] if i % 2 == 0 else COLORS["surface"])
            row.pack(fill="x")
            bg = row["bg"]
            tk.Label(row, text=country, font=FONTS["body"],
                     fg=COLORS["text"], bg=bg,
                     width=20, anchor="w").pack(side="left", padx=16, pady=7)
            tk.Label(row, text=rate, font=FONTS["body"],
                     fg=COLORS["yellow"], bg=bg).pack(side="left")

        tk.Label(inner, text="* Other countries: Variable rates. Contact support.",
                 font=FONTS["body_sm"], fg=COLORS["text_dim"],
                 bg=COLORS["bg"]).pack(pady=10)

    # ═══════════════════════════════════════════
    #  RECIPIENT INPUT SCREEN
    # ═══════════════════════════════════════════
    def _show_recipient_input(self):
        self._clear_body()
        self._build_back_bar("Buy for Another Number")

        inner = self._make_scrollable_frame(self.body)
        tk.Label(inner, text="📲", font=(FONT_FAMILY, 48),
                 fg=COLORS["red_primary"], bg=COLORS["bg"]).pack(pady=(18, 4))

        card = tk.Frame(inner, bg=COLORS["card"],
                        highlightbackground=COLORS["border"], highlightthickness=1)
        card.pack(fill="x", padx=14, pady=10)

        tk.Label(card, text="Enter Recipient's Airtel Number",
                 font=FONTS["heading"], fg=COLORS["white"],
                 bg=COLORS["card"]).pack(anchor="w", padx=16, pady=(14, 4))
        tk.Frame(card, bg=COLORS["border"], height=1).pack(fill="x", padx=16, pady=(0, 10))

        rv = tk.StringVar()
        e = tk.Entry(card, textvariable=rv, font=FONTS["body"],
                     bg=COLORS["input_bg"], fg=COLORS["white"],
                     insertbackground=COLORS["white"], relief="flat", bd=0)
        e.pack(fill="x", padx=16, ipady=10)
        e.focus_set()

        msg = tk.Label(card, text="", font=FONTS["body_sm"],
                       fg=COLORS["green"], bg=COLORS["card"])
        msg.pack(pady=(6, 4))

        def confirm():
            phone = rv.get().strip().replace(" ", "").replace("-", "")
            if len(phone) < 9 or not phone.isdigit():
                msg.config(text="⚠ Invalid phone number.", fg=COLORS["yellow"])
                return
            self.recipient_num = phone
            msg.config(text=f"✅  Recipient confirmed: {phone}", fg=COLORS["green"])

        self._make_button(card, "  Confirm Number  ", confirm, primary=True).pack(
            fill="x", padx=16, pady=(4, 16))

    # ═══════════════════════════════════════════
    #  EXIT
    # ═══════════════════════════════════════════
    def _do_exit(self):
        if messagebox.askyesno("End Session",
                               "Are you sure you want to end the *117# session?",
                               icon="question"):
            self.destroy()

    # ─────────────────────────────────────────────
    #  Reusable helpers
    # ─────────────────────────────────────────────
    def _build_back_bar(self, title):
        bar = tk.Frame(self.body, bg=COLORS["surface"], height=48)
        bar.pack(fill="x")
        bar.pack_propagate(False)
        back = tk.Label(bar, text="◀  Back", font=FONTS["body_sm"],
                        fg=COLORS["red_primary"], bg=COLORS["surface"], cursor="hand2")
        back.pack(side="left", padx=14, pady=14)
        back.bind("<Button-1>", lambda e: self._show_menu(self.current_menu))
        tk.Label(bar, text=title, font=FONTS["heading"],
                 fg=COLORS["white"], bg=COLORS["surface"]).pack(side="left", padx=6)

    def _make_scrollable_frame(self, parent):
        canvas = tk.Canvas(parent, bg=COLORS["bg"], highlightthickness=0, bd=0)
        scrollbar = ttk.Scrollbar(parent, orient="vertical",
                                  command=canvas.yview,
                                  style="Dark.Vertical.TScrollbar")
        canvas.configure(yscrollcommand=scrollbar.set)
        scrollbar.pack(side="right", fill="y")
        canvas.pack(side="left", fill="both", expand=True)

        inner = tk.Frame(canvas, bg=COLORS["bg"])
        win_id = canvas.create_window((0, 0), window=inner, anchor="nw")

        def on_configure(event):
            canvas.configure(scrollregion=canvas.bbox("all"))
            canvas.itemconfig(win_id, width=canvas.winfo_width())

        inner.bind("<Configure>", on_configure)
        canvas.bind("<Configure>", lambda e: canvas.itemconfig(win_id, width=e.width))
        canvas.bind_all("<MouseWheel>", lambda e: canvas.yview_scroll(-1*(e.delta//120), "units"))
        return inner

    def _make_button(self, parent, text, command, primary=True):
        bg    = COLORS["red_primary"] if primary else COLORS["card"]
        fg    = COLORS["white"]
        hover = COLORS["red_hover"] if primary else COLORS["surface"]
        btn = tk.Label(parent, text=text, font=FONTS["btn"],
                       fg=fg, bg=bg, cursor="hand2",
                       relief="flat", pady=10, padx=14)
        btn.bind("<Button-1>", lambda e: command())
        btn.bind("<Enter>", lambda e: btn.config(bg=hover))
        btn.bind("<Leave>", lambda e: btn.config(bg=bg))
        return btn


# ─────────────────────────────────────────────
#  Entry-point
# ─────────────────────────────────────────────
if __name__ == "__main__":
    app = UssdApp()
    app.mainloop()
