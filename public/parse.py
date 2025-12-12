import json

divitions=json.loads(open("divisions.json", encoding="utf8").read().strip())
districts=json.loads(open("districts.json", encoding="utf8").read().strip())
upazilas=json.loads(open("upazilas.json", encoding="utf8").read().strip())

newData={
    "divitions":divitions[2]['data'],
    "districts":districts[2]["data"],
    "upazilas":upazilas[2]["data"]
}

f=open("bangladesh.json", '+w', encoding="utf-8")
f.write(json.dumps(newData))
f.close()