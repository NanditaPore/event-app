import json
from django.http import JsonResponse
from django.conf import settings
import os
from datetime import datetime

def load_data():
    with open(os.path.join(settings.BASE_DIR,'events/data.json')) as f:
        return json.load(f)
    
def events_list(request):
    events=load_data()
    for event in events:
        data_obj = datetime.strptime(event["event_date"],"%Y-%m-%d")
        event["data"]=data_obj.strftime("%d %b")
    return JsonResponse(events, safe=False)

def events_detail(request,event_id):
    events=load_data()
    event= next((e for e in events if e["id"]== event_id),None)
    if event:
        date_obj = datetime.strptime(event["event_date"],"%Y-%m-%d")
        event["date"]=date_obj.strftime("%d-%m-%Y")
        return JsonResponse(event)
    return JsonResponse({"error":"Event not found"},status=404)