from fpdf import FPDF
import os
import shutil

class Standard_CV(FPDF):
    def header(self):
        pass

    def footer(self):
        self.set_y(-15)
        self.set_font("helvetica", "I", 8)
        self.set_text_color(120, 120, 120)
        self.cell(0, 10, f"Page {self.page_no()}/{{nb}}", align="C")

def generate_pdf(output_dir=r"c:\Users\mohaz\OneDrive\Desktop\CV"):
    pdf = Standard_CV(orientation="P", unit="mm", format="A4")
    pdf.alias_nb_pages()
    pdf.set_margins(15, 15, 15)
    pdf.add_page()
    
    # ----------------------------------------------------
    # NAME & HEADER SECTION
    # ----------------------------------------------------
    pdf.set_font("helvetica", "B", 18)
    pdf.set_text_color(20, 50, 100) # Professional dark blue for name
    pdf.cell(0, 8, "MOHAMMAD AL-ZAGHAMEEM", new_x="LMARGIN", new_y="NEXT", align="C")
    
    pdf.set_font("helvetica", "B", 9.5)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 5, "CYBERSECURITY GRADUATE | JUNIOR SOC ANALYST | DFIR ANALYST", new_x="LMARGIN", new_y="NEXT", align="C")
    
    # Contact Details Single Centered Line
    pdf.set_x(36)
    pdf.set_font("helvetica", "", 8.8)
    pdf.set_text_color(60, 60, 60)
    pdf.write(4, "Tafilah, Jordan  |  +962 799919621  |  ")
    pdf.set_text_color(0, 100, 255)
    pdf.write(4, "Email", link="mailto:mohzag615@gmail.com")
    pdf.set_text_color(60, 60, 60)
    pdf.write(4, "  |  ")
    pdf.set_text_color(0, 100, 255)
    pdf.write(4, "LinkedIn", link="https://www.linkedin.com/in/mohammad-zaghameem-0b01511b6")
    pdf.set_text_color(60, 60, 60)
    pdf.write(4, "  |  ")
    pdf.set_text_color(0, 100, 255)
    pdf.write(4, "GitHub", link="https://github.com/mohammadzag")
    pdf.set_text_color(60, 60, 60)
    pdf.write(4, "  |  ")
    pdf.set_text_color(20, 100, 80)
    pdf.set_font("helvetica", "B", 8.8)
    pdf.write(4, "Portfolio", link="https://mohammadzag.github.io/Portofolio/")
    pdf.write(4, "\n")
    
    # Divider line
    pdf.set_draw_color(20, 50, 100)
    pdf.set_line_width(0.5)
    pdf.line(15, 39, 195, 39)
    pdf.ln(4)
    
    # Helper to add standard sections
    def add_section_header(title):
        pdf.ln(3)
        pdf.set_font("helvetica", "B", 11)
        pdf.set_text_color(20, 50, 100)
        pdf.cell(0, 5, title, new_x="LMARGIN", new_y="NEXT")
        pdf.set_draw_color(200, 200, 200)
        pdf.set_line_width(0.2)
        pdf.line(15, pdf.get_y(), 195, pdf.get_y())
        pdf.ln(2)

    # ----------------------------------------------------
    # PROFESSIONAL SUMMARY
    # ----------------------------------------------------
    add_section_header("PROFESSIONAL SUMMARY")
    pdf.set_font("helvetica", "", 9.2)
    pdf.set_text_color(40, 40, 40)
    summary_text = (
        "Highly motivated Cybersecurity graduate from Tafila Technical University, Computer & Digital Skills Teacher, "
        "and experienced academic Teaching Assistant with a proven track record in threat analysis, digital forensics, "
        "and network security. Possesses hands-on training with the National Cybersecurity Center (NCSC) in critical "
        "infrastructure defense and incident response. Co-founder of the Jordan Cybersecurity Club (JCC) platform, "
        "combining technical proficiency in Python scripting, operating systems, and virtualization with an "
        "industry-validated Trainer of Trainers (ToT) certification. Seeking a full-time position as a Junior SOC Analyst, "
        "Digital Forensics (DFIR) Analyst, or Junior Security Engineer."
    )
    pdf.multi_cell(0, 4.2, summary_text)
    
    # ----------------------------------------------------
    # EDUCATION
    # ----------------------------------------------------
    add_section_header("EDUCATION")
    pdf.set_font("helvetica", "B", 9.5)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(120, 5, "Bachelor of Science in Cybersecurity")
    pdf.set_font("helvetica", "B", 9)
    pdf.set_text_color(20, 50, 100)
    pdf.cell(60, 5, "September 2026", align="R", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("helvetica", "I", 9)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 4, "Tafila Technical University (TTU) - Tafila, Jordan", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("helvetica", "", 8.8)
    pdf.set_text_color(60, 60, 60)
    pdf.cell(0, 4, "Relevant Coursework: Infrastructure Security, Network Security, Operating Systems, Cryptography, Digital Forensics, Database Security", new_x="LMARGIN", new_y="NEXT")

    # ----------------------------------------------------
    # PROFESSIONAL EXPERIENCE (OLDEST TO NEWEST)
    # ----------------------------------------------------
    add_section_header("PROFESSIONAL EXPERIENCE")
    
    # Job 1 (2024 - 2026): Undergraduate Teaching Assistant at TTU
    pdf.set_font("helvetica", "B", 9.5)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(120, 5, "Undergraduate Teaching Assistant")
    pdf.set_font("helvetica", "B", 9)
    pdf.set_text_color(20, 50, 100)
    pdf.cell(60, 5, "2024 - 2026", align="R", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("helvetica", "I", 9)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 4, "Tafila Technical University - Tafila, Jordan", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("helvetica", "", 8.8)
    pdf.set_text_color(60, 60, 60)
    pdf.multi_cell(0, 3.8, (
        "- Coordinated alongside engineering faculty to deliver laboratory instruction, module guides, and academic grading rubrics.\n"
        "- Facilitated labs for Operating Systems (Linux, shell scripting, process handling), AI, and Cryptographic Discrete Math.\n"
        "- Provided personalized technical troubleshooting and network configuration mentorship to over 100 undergraduate students."
    ))
    pdf.set_font("helvetica", "B", 8)
    pdf.set_text_color(0, 100, 255)
    pdf.cell(0, 4.2, "  [Click Here for Work Verification Document]", link="https://drive.google.com/file/d/1bM5O8yuzZcZbu1r3CI7-i-38e5yR0klt/view", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(1)

    # Job 2 (2024 - Present): Co-Founder Jordan Cybersecurity Club
    pdf.set_font("helvetica", "B", 9.5)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(120, 5, "Co-Founder")
    pdf.set_font("helvetica", "B", 9)
    pdf.set_text_color(20, 50, 100)
    pdf.cell(60, 5, "2024 - Present", align="R", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("helvetica", "I", 9)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 4, "Jordan Cybersecurity Club (JCC) Platform - Jordan", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("helvetica", "", 8.8)
    pdf.set_text_color(60, 60, 60)
    pdf.multi_cell(0, 3.8, (
        "- Co-established a collaborative network bridging academic curricula with real-world security sector competencies.\n"
        "- Organized and hosted community-driven digital literacy workshops, local Capture the Flag (CTF) events, and secure coding bootcamps.\n"
        "- Developed curricula and delivered hands-on instruction in Python scripting and basic cybersecurity foundations."
    ))
    pdf.ln(1)

    # Job 3 (2025): Cybersecurity Trainee at NCSC
    pdf.set_font("helvetica", "B", 9.5)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(120, 5, "Cybersecurity Trainee")
    pdf.set_font("helvetica", "B", 9)
    pdf.set_text_color(20, 50, 100)
    pdf.cell(60, 5, "2025", align="R", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("helvetica", "I", 9)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 4, "National Cybersecurity Center (NCSC) - Amman, Jordan", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("helvetica", "", 8.8)
    pdf.set_text_color(60, 60, 60)
    pdf.multi_cell(0, 3.8, (
        "- Participated in intensive cybersecurity training modules focused on Critical National Infrastructure (CNI) defense.\n"
        "- Acquired practical experience in real-time threat evaluation, vulnerability assessments, and incident response mitigation.\n"
        "- Monitored live network traffic metrics utilizing enterprise tools to isolate anomalous Active Directory and endpoint footprints."
    ))
    pdf.ln(1)

    # Job 4 (August 2026 - Present): Teacher at Erweam Secondary School for Boys
    pdf.set_font("helvetica", "B", 9.5)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(120, 5, "Computer & Digital Skills Teacher")
    pdf.set_font("helvetica", "B", 9)
    pdf.set_text_color(20, 50, 100)
    pdf.cell(60, 5, "August 2026 - Present", align="R", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("helvetica", "I", 9)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 4, "Erweam Secondary School for Boys - Tafilah, Jordan", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("helvetica", "", 8.8)
    pdf.set_text_color(60, 60, 60)
    pdf.multi_cell(0, 3.8, (
        "- Instruct and mentor students from 7th to 12th grade in digital skills, computer fundamentals, and IT literacy.\n"
        "- Deliver structured curricula covering operating systems, basic programming logic, software tools, and cyber safety.\n"
        "- Design and supervise practical computer lab sessions, evaluate student performance, and foster technical problem-solving."
    ))

    # Add page 2
    pdf.add_page()

    # ----------------------------------------------------
    # TECHNICAL PROJECTS
    # ----------------------------------------------------
    add_section_header("TECHNICAL PROJECTS")
    
    # Project 1
    pdf.set_font("helvetica", "B", 9.5)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(0, 4.5, "Digital Forensics Insider Threat Investigation (FTK Imager & Autopsy)", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("helvetica", "", 8.8)
    pdf.set_text_color(60, 60, 60)
    pdf.multi_cell(0, 3.8, (
        "- Conducted a mock threat investigation of a compromised endpoint to isolate evidence of data exfiltration.\n"
        "- Acquired raw disk images with FTK Imager, analyzed Windows Registry hives, event logs, prefetch, and built an Autopsy timeline."
    ))
    pdf.ln(1.5)

    # Project 2
    pdf.set_font("helvetica", "B", 9.5)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(0, 4.5, "Secure E-Commerce Infrastructure Risk Analysis & Threat Modeling", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("helvetica", "", 8.8)
    pdf.set_text_color(60, 60, 60)
    pdf.multi_cell(0, 3.8, (
        "- Performed a comprehensive security assessment and threat modeling (STRIDE) of a simulated web platform.\n"
        "- Designed technical controls including secure DMZ network segmentation, WAF rules, and secure backup protocols."
    ))
    pdf.ln(1.5)

    # Project 3
    pdf.set_font("helvetica", "B", 9.5)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(100, 4.5, "EduKernel-Suite")
    pdf.set_font("helvetica", "B", 8.5)
    pdf.set_text_color(0, 100, 255)
    pdf.cell(80, 4.5, "[GitHub Repository]", align="R", new_x="LMARGIN", new_y="NEXT", link="https://github.com/Dalcots/EduKernel-Suite")
    pdf.set_font("helvetica", "", 8.8)
    pdf.set_text_color(60, 60, 60)
    pdf.multi_cell(0, 3.8, (
        "- Developed a virtual multi-image container laboratory designed for academic cybersecurity training scenarios.\n"
        "- Configured network virtualization and container nodes (Docker) to simulate network attack and defense labs."
    ))
    pdf.ln(1.5)

    # Project 4
    pdf.set_font("helvetica", "B", 9.5)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(100, 4.5, "MHZ Tools 2.0")
    pdf.set_font("helvetica", "B", 8.5)
    pdf.set_text_color(0, 100, 255)
    pdf.cell(80, 4.5, "[GitHub Repository]", align="R", new_x="LMARGIN", new_y="NEXT", link="https://github.com/mohammadzag/MHZTools")
    pdf.set_font("helvetica", "", 8.8)
    pdf.set_text_color(60, 60, 60)
    pdf.multi_cell(0, 3.8, (
        "- Developed an all-in-one offline-first desktop application integrating EXIF metadata extraction, integrated C/C++ GCC Win32 compilation, PE binary entropy audits, and static document analysis."
    ))
    pdf.ln(1.5)

    # Project 5
    pdf.set_font("helvetica", "B", 9.5)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(100, 4.5, "Gravity Utilities")
    pdf.set_font("helvetica", "B", 8.5)
    pdf.set_text_color(0, 100, 255)
    pdf.cell(80, 4.5, "[GitHub Repository]", align="R", new_x="LMARGIN", new_y="NEXT", link="https://github.com/mohammadzag/GravityUtilities_")
    pdf.set_font("helvetica", "", 8.8)
    pdf.set_text_color(60, 60, 60)
    pdf.multi_cell(0, 3.8, (
        "- Developed a standalone Windows WebView2 desktop app that packages video downloading (yt-dlp), offline local Wi-Fi file-sharing portals, PDF compilation, and image compression tools."
    ))
    pdf.ln(1.5)

    # Project 6
    pdf.set_font("helvetica", "B", 9.5)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(90, 4.5, "MeasureDiff")
    pdf.set_font("helvetica", "B", 8.2)
    pdf.set_text_color(0, 100, 255)
    pdf.cell(45, 4.5, "[Live Application]", align="R", link="https://mohammadzag.github.io/Measures/")
    pdf.set_text_color(80, 80, 80)
    pdf.cell(5, 4.5, "|", align="R")
    pdf.set_text_color(0, 100, 255)
    pdf.cell(40, 4.5, "[GitHub]", align="R", new_x="LMARGIN", new_y="NEXT", link="https://github.com/mohammadzag/Measures")
    pdf.set_font("helvetica", "", 8.8)
    pdf.set_text_color(60, 60, 60)
    pdf.multi_cell(0, 3.8, (
        "- Programmed a universal unit and measurement difference web application converting units across 10 major categories and computing absolute/percentage deltas and visual scales."
    ))

    # ----------------------------------------------------
    # TECHNICAL SKILLS (STRUCTURED TWO-COLUMN TABLE LAYOUT)
    # ----------------------------------------------------
    add_section_header("TECHNICAL SKILLS")
    
    pdf.set_font("helvetica", "B", 9)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(90, 4.5, "Security Operations & Forensics")
    pdf.cell(90, 4.5, "Systems & Networking", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("helvetica", "", 8.5)
    pdf.set_text_color(60, 60, 60)
    y_pos = pdf.get_y()
    pdf.multi_cell(85, 3.8, "- Digital Forensics (Autopsy, FTK Imager)\n- Threat Hunting & OSINT\n- Wireshark & Nmap Network Audits\n- Kali Linux & Metasploit Pentesting")
    
    pdf.set_xy(105, y_pos)
    pdf.multi_cell(85, 3.8, "- TCP/IP & Network Security Policies\n- Linux Administration (Ubuntu, Manjaro)\n- Windows Server & Active Directory\n- Docker Virtualization & Containers")
    pdf.ln(2)

    pdf.set_x(15)
    pdf.set_font("helvetica", "B", 9)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(90, 4.5, "Programming & Automation")
    pdf.cell(90, 4.5, "Leadership & Instruction", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("helvetica", "", 8.5)
    pdf.set_text_color(60, 60, 60)
    y_pos = pdf.get_y()
    pdf.multi_cell(85, 3.8, "- Python (Security Scripts & Automation)\n- C++ Coding Foundations\n- IoT & ESP32 Microcontrollers")
    
    pdf.set_xy(105, y_pos)
    pdf.multi_cell(85, 3.8, "- Technical Instruction & ToT Methods\n- Workshop & Event Management\n- Public Speaking & Presentation Skills")
    pdf.ln(2)

    # ----------------------------------------------------
    # CERTIFICATIONS & LANGUAGES
    # ----------------------------------------------------
    # Two columns for Certifications (left) and Languages (right)
    pdf.set_x(15)
    add_section_header("CERTIFICATIONS & LANGUAGES")
    
    pdf.set_font("helvetica", "B", 9)
    pdf.set_text_color(30, 30, 30)
    pdf.cell(130, 4.5, "Professional Certifications")
    pdf.cell(50, 4.5, "Languages", new_x="LMARGIN", new_y="NEXT")
    
    pdf.set_font("helvetica", "", 8.2)
    pdf.set_text_color(60, 60, 60)
    y_pos = pdf.get_y()
    
    pdf.multi_cell(125, 3.8, (
        "- Claude Code in Action Certificate of Completion (Anthropic)\n"
        "- Microsoft Certified: Cybersecurity Fundamentals\n"
        "- Trainer of Trainers (ToT) Professional Certificate (TVSDC Jordan)\n"
        "- Defensive Security & Threat Hunting Learning Paths (TryHackMe)\n"
        "- Data Entry Professional Certification (EFE-Jordan)\n"
        "- Advanced Computer Networking Specialist (Academic)\n"
        "- Python Scripting for Information Security & Automation (Academic)"
    ))
    
    pdf.set_xy(140, y_pos)
    pdf.multi_cell(50, 4.2, (
        "- English (Professional)\n"
        "- Arabic (Native)"
    ))

    # Output PDF
    dest_path = os.path.join(output_dir, "Mohammad_Al-Zaghameem_Cybersecurity_CV_Final.pdf")
    pdf.output(dest_path)
    print(f"Generated CV PDF at: {dest_path}")
    
    # Copy to assets folder for download
    assets_dest_path = os.path.join(output_dir, "assets", "mohammad_cv.pdf")
    shutil.copy2(dest_path, assets_dest_path)
    print(f"Copied CV PDF to website assets: {assets_dest_path}")

if __name__ == "__main__":
    generate_pdf()
