import zipfile
import xml.etree.ElementTree as ET
import re
import json
import os

def col_letter_to_index(col_str):
    exp = 0
    idx = 0
    for char in reversed(col_str):
        idx += (ord(char) - ord('A') + 1) * (26 ** exp)
        exp += 1
    return idx - 1

path = 'public/images/new-img/DEALER MASTER 13-05-2025.xlsx'
if not os.path.exists(path):
    print("File not found:", path)
    exit(1)

with zipfile.ZipFile(path) as z:
    shared_strings = []
    if 'xl/sharedStrings.xml' in z.namelist():
        ss_tree = ET.fromstring(z.read('xl/sharedStrings.xml'))
        for si in ss_tree.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
            t = si.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t')
            if t is not None and t.text:
                shared_strings.append(t.text)
            else:
                text_parts = [elem.text for elem in si.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t') if elem.text]
                shared_strings.append(''.join(text_parts))

    wb_rels_tree = ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
    rel_map = {r.attrib['Id']: r.attrib['Target'] for r in wb_rels_tree.findall('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship')}

    wb_tree = ET.fromstring(z.read('xl/workbook.xml'))
    sheets_info = []
    for s in wb_tree.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheet'):
        sheets_info.append((s.attrib['name'], rel_map[s.attrib['{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id']]))

    dealers_map = {}
    dealer_id = 1

    def clean_text(s):
        if not s: return ""
        s = re.sub(r'\s+', ' ', str(s)).strip()
        return s

    def clean_contact_person(name):
        if not name: return ""
        name = clean_text(name).upper()
        if name in ['SHOP', '0', '-']: return ""
        # Remove honorific words like BHAI, JI, BHAIYA, SAHAB, SIR, SETH, MR, MS, etc.
        name = re.sub(r'\b(BHAI|JI|BHAIYA|SAHAB|SIR|SETH|SETT)\b', '', name, flags=re.IGNORECASE)
        name = re.sub(r'^(MR\.?|MS\.?|MRS\.?|SHREE|SHRI)\s+', '', name, flags=re.IGNORECASE)
        name = clean_text(name)
        return name

    MUMBAI_AREAS = [
        'DADAR', 'BORIVALI', 'ANDHERI', 'MALAD', 'SANTACRUZ', 'SANTACRAZ',
        'GRANT ROAD', 'PAREL', 'GHATKOPAR', 'MULUND', 'MULUD', 'THANE',
        'MIRA ROAD', 'MIRA ROAD E', 'BHAYANDER', 'BHAYANDER W', 'VASAI',
        'VASAI WEST', 'NALLASOPARA', 'NALLASOPARA EAST', 'NALLASOPARA WEST',
        'BANDRA', 'KURLA', 'CHEMBUR', 'KANDIVALI', 'GOREGAON', 'VIKHROLI',
        'BHANDUP', 'KALYAN', 'DOMBIVLI', 'NAVI MUMBAI', 'VASHI', 'NERUL',
        'KHARGHAR', 'PANVEL', 'CHURCHGATE', 'CST', 'FORT', 'COLABA'
    ]

    def extract_city_area_state(raw_city, raw_area, raw_state, party_name):
        c = clean_text(raw_city).upper().replace('(', '').replace(')', '').strip()
        a = clean_text(raw_area).upper().replace('(', '').replace(')', '').strip()
        st = clean_text(raw_state).upper()
        p = party_name.upper()

        # Check if party name contains area in parens e.g. "ETERNITY (DADAR)"
        paren_match = re.search(r'\((.*?)\)', party_name)
        if paren_match:
            cand = paren_match.group(1).upper().strip()
            if cand in MUMBAI_AREAS or any(cand.startswith(m) for m in MUMBAI_AREAS):
                a = cand
                c = 'MUMBAI'
                st = 'MAHARASHTRA'
            elif 'SURAT' in cand:
                c = 'SURAT'
                st = 'GUJARAT'
                a = cand.replace('SURAT', '').strip()
            elif 'ALLIBAUG' in cand or 'ALIBAUG' in cand:
                c = 'ALIBAUG'
                st = 'MAHARASHTRA'
            elif 'PEN' in cand:
                c = 'PEN'
                st = 'MAHARASHTRA'
            elif 'KHOPOLI' in cand:
                c = 'KHOPOLI'
                st = 'MAHARASHTRA'

        # Check raw city for Mumbai areas
        for m in MUMBAI_AREAS:
            if m in c or (c and m.startswith(c) and len(c) >= 4):
                a = c if not a else a
                c = 'MUMBAI'
                st = 'MAHARASHTRA'
                break

        # Check Surat areas
        if 'SURAT' in c or 'SURAT' in a or 'SURAT' in p:
            if c != 'SURAT' and not a:
                a = c.replace('SURAT', '').strip()
            c = 'SURAT'
            st = 'GUJARAT'

        # Check Pune areas
        if 'PUNE' in c or 'PUNE' in a or 'PUNE' in p:
            if c != 'PUNE' and not a:
                a = c.replace('PUNE', '').strip()
            c = 'PUNE'
            st = 'MAHARASHTRA'

        # Check Coimbatore areas
        if 'COIMBATORE' in c or 'COIMBATORE' in a or 'COIMBATORE' in p:
            if c != 'COIMBATORE' and not a:
                a = c.replace('COIMBATORE', '').strip()
            c = 'COIMBATORE'
            st = 'TAMIL NADU'

        # Check Vapi areas
        if 'VAPI' in c or 'VAPI' in a or 'VAPI' in p:
            if c != 'VAPI' and not a:
                a = c.replace('VAPI', '').strip()
            c = 'VAPI'
            st = 'GUJARAT'

        # Normalizations
        if c == 'AHEMDABAD': c = 'AHMEDABAD'; st = 'GUJARAT'
        if c == 'PANCHUKLA': c = 'PANCHKULA'; st = 'HARYANA'
        if c == 'BHATINDA': c = 'BATHINDA'; st = 'PUNJAB'
        if c == 'MORADABAD': st = 'UTTAR PRADESH'
        if c == 'AMRITSAR': st = 'PUNJAB'
        if c == 'JALANDHAR': st = 'PUNJAB'
        if c == 'LUDHIANA': st = 'PUNJAB'
        if c == 'KANPUR': st = 'UTTAR PRADESH'
        if c == 'LUCKNOW': st = 'UTTAR PRADESH'
        if c == 'VARANASI': st = 'UTTAR PRADESH'
        if c == 'AGRA': st = 'UTTAR PRADESH'
        if c == 'ALLAHABAD' or c == 'PRAYAGRAJ': c = 'PRAYAGRAJ (ALLAHABAD)'; st = 'UTTAR PRADESH'
        if c == 'DELHI' or c == 'NEW DELHI': c = 'DELHI'; st = 'DELHI'
        if c == 'HYDERABAD' or c == 'HYADRABAD': c = 'HYDERABAD'; st = 'TELANGANA'
        if c == 'BANGALORE' or c == 'BENGALURU': c = 'BANGALORE'; st = 'KARNATAKA'
        if c == 'CHENNAI' or c == 'MADRAS': c = 'CHENNAI'; st = 'TAMIL NADU'
        if c == 'KOLKATTA' or c == 'KOLKATA': c = 'KOLKATA'; st = 'WEST BENGAL'
        if c == 'VADODARA' or c == 'VADODRA' or c == 'BARODA': c = 'VADODARA'; st = 'GUJARAT'
        if c == 'SOLAPUR' or c == 'SHOLAPUR': c = 'SOLAPUR'; st = 'MAHARASHTRA'
        if c == 'JALGAON': st = 'MAHARASHTRA'
        if c == 'VALSAD': st = 'GUJARAT'
        if c == 'TIRUPATI': st = 'ANDHRA PRADESH'
        if c == 'MYSURU' or c == 'MYSORE': c = 'MYSURU'; st = 'KARNATAKA'

        # Clean state name
        if st in ['GUJRAT', 'GUJARAT']: st = 'GUJARAT'
        elif st in ['MAHARASTRA', 'MAHARASHTRA']: st = 'MAHARASHTRA'
        elif st in ['UTTARPRADESH', 'UTTAR PRADESH']: st = 'UTTAR PRADESH'
        elif st in ['TAMILNADU', 'TAMIL NADU']: st = 'TAMIL NADU'
        elif st in ['KOLKATTA', 'KOLKATA', 'WEST BENGAL']: st = 'WEST BENGAL'
        elif st in ['TELANGANA']: st = 'TELANGANA'
        elif st in ['ANDHRA', 'ANDHRA PRADESH']: st = 'ANDHRA PRADESH'
        elif st in ['DELHI']: st = 'DELHI'
        elif st in ['PUNJAB']: st = 'PUNJAB'
        elif st in ['HARYANA']: st = 'HARYANA'
        elif st in ['KARNATAKA']: st = 'KARNATAKA'
        elif st in ['KERALA']: st = 'KERALA'
        elif st in ['JAMMU & KASHMIR', 'JAMMU']: st = 'JAMMU & KASHMIR'
        elif st in ['UTTARAKHAND', 'UTTRANCHAL']: st = 'UTTARAKHAND'

        return c, a, st

    for name, target in sheets_info:
        xml_path = 'xl/' + target if not target.startswith('xl/') else target
        stree = ET.fromstring(z.read(xml_path))
        sheet_rows = []
        for r in stree.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row'):
            row_dict = {}
            for c in r.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c'):
                ref = c.attrib.get('r', '')
                col_match = re.match(r'([A-Z]+)', ref)
                if not col_match: continue
                col_idx = col_letter_to_index(col_match.group(1))
                t_attr = c.attrib.get('t', '')
                v = c.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
                val = ''
                if v is not None and v.text:
                    if t_attr == 's':
                        idx = int(v.text)
                        val = shared_strings[idx] if idx < len(shared_strings) else v.text
                    else:
                        val = v.text
                row_dict[col_idx] = clean_text(val)
            if row_dict:
                sheet_rows.append(row_dict)

        print(f"Sheet '{name}': {len(sheet_rows)} rows found")

        if name in ['ESCORT', 'DESIGNER']:
            brand = "Escort Watches" if name == 'ESCORT' else "D'Signer Watches"
            for row in sheet_rows[1:]:
                party = clean_text(row.get(1, ''))
                if not party or party == 'PARTY NAME': continue
                phone = clean_text(row.get(2, ''))
                contact = clean_contact_person(row.get(3, ''))
                city, area, state = extract_city_area_state(row.get(5, ''), '', row.get(6, ''), party)
                email = clean_text(row.get(7, ''))
                loc = clean_text(row.get(8, ''))
                
                key = (party.upper(), city.upper(), area.upper())
                if key not in dealers_map:
                    dealers_map[key] = {
                        'id': f"dlr-{dealer_id}",
                        'name': party,
                        'contactPerson': contact,
                        'phone': phone,
                        'email': email,
                        'brands': [brand],
                        'area': area,
                        'city': city,
                        'state': state,
                        'location': loc or 'North India / Delhi Office',
                        'tabs': [name]
                    }
                    dealer_id += 1
                else:
                    if brand not in dealers_map[key]['brands']:
                        dealers_map[key]['brands'].append(brand)
                    if not dealers_map[key]['contactPerson'] and contact:
                        dealers_map[key]['contactPerson'] = contact
                    if not dealers_map[key]['phone'] and phone:
                        dealers_map[key]['phone'] = phone
                    if not dealers_map[key]['email'] and email:
                        dealers_map[key]['email'] = email
                    if name not in dealers_map[key]['tabs']:
                        dealers_map[key]['tabs'].append(name)

        elif name == 'ganesh':
            for row in sheet_rows[1:]:
                party = clean_text(row.get(1, ''))
                if not party or party == 'PARTY NAME': continue
                phone = clean_text(row.get(2, ''))
                contact = clean_contact_person(row.get(3, ''))
                escort_val = clean_text(row.get(4, ''))
                designer_val = clean_text(row.get(5, ''))
                city, area, state = extract_city_area_state(row.get(6, ''), '', row.get(7, '') or 'GUJARAT', party)
                email = clean_text(row.get(8, ''))
                loc = clean_text(row.get(9, ''))

                brands = []
                if designer_val and designer_val != '-':
                    brands.append("D'Signer Watches")
                if escort_val and escort_val != '-':
                    brands.append("Escort Watches")
                if not brands:
                    brands = ["D'Signer Watches", "Escort Watches"]

                key = (party.upper(), city.upper(), area.upper())
                if key not in dealers_map:
                    dealers_map[key] = {
                        'id': f"dlr-{dealer_id}",
                        'name': party,
                        'contactPerson': contact,
                        'phone': phone,
                        'email': email,
                        'brands': brands,
                        'area': area,
                        'city': city,
                        'state': state,
                        'location': loc or 'Gujarat / Outside Mumbai',
                        'tabs': [name]
                    }
                    dealer_id += 1
                else:
                    for b in brands:
                        if b not in dealers_map[key]['brands']:
                            dealers_map[key]['brands'].append(b)
                    if not dealers_map[key]['contactPerson'] and contact:
                        dealers_map[key]['contactPerson'] = contact
                    if not dealers_map[key]['phone'] and phone:
                        dealers_map[key]['phone'] = phone
                    if not dealers_map[key]['email'] and email:
                        dealers_map[key]['email'] = email
                    if name not in dealers_map[key]['tabs']:
                        dealers_map[key]['tabs'].append(name)

        elif name == 'BHARATH CHAVAN':
            for row in sheet_rows[1:]:
                party = clean_text(row.get(1, ''))
                if not party or party == 'PARTY NAME': continue
                phone = clean_text(row.get(2, ''))
                contact = clean_contact_person(row.get(3, ''))
                city, area, state = extract_city_area_state(row.get(6, ''), row.get(5, ''), row.get(7, '') or 'UTTAR PRADESH', party)
                email = clean_text(row.get(8, ''))
                loc = clean_text(row.get(9, ''))

                key = (party.upper(), city.upper(), area.upper())
                if key not in dealers_map:
                    dealers_map[key] = {
                        'id': f"dlr-{dealer_id}",
                        'name': party,
                        'contactPerson': contact,
                        'phone': phone,
                        'email': email,
                        'brands': ["Escort Watches"],
                        'area': area,
                        'city': city,
                        'state': state,
                        'location': loc or 'Uttar Pradesh',
                        'tabs': [name]
                    }
                    dealer_id += 1
                else:
                    if "Escort Watches" not in dealers_map[key]['brands']:
                        dealers_map[key]['brands'].append("Escort Watches")
                    if not dealers_map[key]['area'] and area:
                        dealers_map[key]['area'] = area
                    if not dealers_map[key]['contactPerson'] and contact:
                        dealers_map[key]['contactPerson'] = contact
                    if not dealers_map[key]['phone'] and phone:
                        dealers_map[key]['phone'] = phone
                    if not dealers_map[key]['email'] and email:
                        dealers_map[key]['email'] = email
                    if name not in dealers_map[key]['tabs']:
                        dealers_map[key]['tabs'].append(name)

        elif name == 'Sheet1':
            for row in sheet_rows:
                party = clean_text(row.get(0, ''))
                if not party: continue
                city, area, state = extract_city_area_state('', '', '', party)

                key = (party.upper(), city.upper(), area.upper())
                if key not in dealers_map:
                    dealers_map[key] = {
                        'id': f"dlr-{dealer_id}",
                        'name': party,
                        'contactPerson': '',
                        'phone': '',
                        'email': '',
                        'brands': ["D'Signer Watches", "Escort Watches"],
                        'area': area,
                        'city': city,
                        'state': state,
                        'location': 'Retail Store Partner',
                        'tabs': [name]
                    }
                    dealer_id += 1
                else:
                    if name not in dealers_map[key]['tabs']:
                        dealers_map[key]['tabs'].append(name)

    dealers_list = list(dealers_map.values())
    print(f"Total deduplicated dealers: {len(dealers_list)}")

    # Add searchable text and clean googleMapsQuery to every dealer
    for d in dealers_list:
        address_parts = [p for p in [d['name'], d['area'], d['city'], d['state'], 'India'] if p]
        d['googleMapsQuery'] = "https://www.google.com/maps/search/?api=1&query=" + "+".join([clean_text(p).replace(" ", "+") for p in address_parts])
        d['searchIndex'] = f"{d['name']} {d['city']} {d['state']} {d['area']} {d['contactPerson']} {d['phone']} {d['email']} {' '.join(d['brands'])}".lower()

    # Save to src/data/dealers.json
    os.makedirs('src/data', exist_ok=True)
    with open('src/data/dealers.json', 'w', encoding='utf-8') as f:
        json.dump(dealers_list, f, indent=2, ensure_ascii=False)

    print("Saved to src/data/dealers.json successfully!")
