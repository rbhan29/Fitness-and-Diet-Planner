import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Utensils, Plus, Save, Trash2, Edit } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Define meal and food types
interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  portion: string;
}

interface Meal {
  id: string;
  name: string;
  items: FoodItem[];
}

type MealType = "breakfast" | "lunch" | "snacks" | "dinner";

interface DailyPlan {
  [key: string]: Meal;
}

interface WeeklyPlan {
  [key: string]: DailyPlan;
}

//  food database
const foodDatabase: FoodItem[] = [
  { id: "b1", name: "Aloo Parantha", calories: 210, protein: 5, carbs: 35, fats: 7, portion: "100g" },
  { id: "b2", name: "Poha", calories: 130, protein: 2.5, carbs: 23, fats: 3, portion: "100g" },
  { id: "b3", name: "Upma", calories: 155, protein: 3, carbs: 27, fats: 5, portion: "100g" },
  { id: "b4", name: "Masala Dosa", calories: 180, protein: 4, carbs: 30, fats: 6, portion: "100g" },
  { id: "b5", name: "Idli", calories: 110, protein: 2, carbs: 20, fats: 2, portion: "100g" },
  { id: "b6", name: "Paneer Sandwich", calories: 250, protein: 9, carbs: 22, fats: 13, portion: "100g" },
  { id: "b7", name: "Egg Bhurji", calories: 160, protein: 11, carbs: 2, fats: 12, portion: "100g" },
  { id: "b8", name: "Chana Chaat", calories: 180, protein: 9, carbs: 25, fats: 5, portion: "100g" },
  { id: "b9", name: "Bread Omelette", calories: 220, protein: 10, carbs: 20, fats: 10, portion: "100g" },
  { id: "b10", name: "Sabudana Khichdi", calories: 190, protein: 2, carbs: 33, fats: 6, portion: "100g" },
  { id: "b11", name: "Milk with Cornflakes", calories: 150, protein: 5, carbs: 25, fats: 3, portion: "100g" },
  { id: "b12", name: "Besan Chilla", calories: 180, protein: 8, carbs: 20, fats: 8, portion: "100g" },
  { id: "b13", name: "Stuffed Paneer Parantha", calories: 230, protein: 10, carbs: 28, fats: 9, portion: "100g" },
  { id: "s1", name: "Gulab Jamun", calories: 361, protein: 5, carbs: 56, fats: 14, portion: "2 pieces (~100g)" },
  { id: "s2", name: "Rasgulla", calories: 186, protein: 4, carbs: 38, fats: 3, portion: "2 pieces (~100g)" },
  { id: "s3", name: "Jalebi", calories: 441, protein: 1.5, carbs: 80, fats: 20, portion: "100g" },
  { id: "s4", name: "Kaju Katli", calories: 488, protein: 8, carbs: 52, fats: 25, portion: "100g" },
  { id: "s5", name: "Soan Papdi", calories: 470, protein: 6, carbs: 66, fats: 22, portion: "100g" },
  { id: "s6", name: "Besan Ladoo", calories: 450, protein: 8, carbs: 48, fats: 24, portion: "2 laddoos (~100g)" },
  { id: "s7", name: "Motichoor Ladoo", calories: 412, protein: 6, carbs: 52, fats: 20, portion: "2 laddoos (~100g)" },
  { id: "s8", name: "Milk Cake", calories: 385, protein: 10, carbs: 46, fats: 18, portion: "100g" },
  { id: "s9", name: "Peda", calories: 370, protein: 6, carbs: 52, fats: 16, portion: "3 pieces (~100g)" },
  { id: "s10", name: "Barfi (Coconut)", calories: 420, protein: 4, carbs: 58, fats: 20, portion: "100g" },
  { id: "s11", name: "Kalakand", calories: 350, protein: 8, carbs: 45, fats: 15, portion: "100g" },
  { id: "s12", name: "Rasmalai", calories: 215, protein: 6, carbs: 30, fats: 8, portion: "2 pieces + milk (~120g)" },
  { id: "s13", name: "Chum Chum", calories: 275, protein: 5, carbs: 45, fats: 8, portion: "2 pieces (~100g)" },
  { id: "s14", name: "Sandesh", calories: 235, protein: 8, carbs: 28, fats: 10, portion: "2 pieces (~100g)" },
  { id: "s15", name: "Halwa (Suji)", calories: 330, protein: 4, carbs: 50, fats: 14, portion: "100g" },
  { id: "s16", name: "Halwa (Gajar)", calories: 365, protein: 3.5, carbs: 48, fats: 18, portion: "100g" },
  { id: "s17", name: "Halwa (Moong Dal)", calories: 410, protein: 8, carbs: 50, fats: 20, portion: "100g" },
  { id: "s18", name: "Malpua", calories: 350, protein: 4, carbs: 45, fats: 18, portion: "2 pieces (~100g)" },
  { id: "s19", name: "Imarti", calories: 420, protein: 2.5, carbs: 70, fats: 18, portion: "100g" },
  { id: "s20", name: "Kheer (Rice Pudding)", calories: 130, protein: 3, carbs: 20, fats: 4, portion: "100g" },
  { id: "s21", name: "Kesari Bath", calories: 250, protein: 3, carbs: 40, fats: 10, portion: "100g" },
  { id: "s22", name: "Payasam", calories: 190, protein: 3, carbs: 32, fats: 6, portion: "100g" },
  { id: "s23", name: "Gajar Halwa with Khoya", calories: 385, protein: 6, carbs: 45, fats: 18, portion: "100g" },
  { id: "s24", name: "Doodh Peda", calories: 405, protein: 6, carbs: 52, fats: 18, portion: "100g" },
  { id: "s25", name: "Dry Fruit Barfi", calories: 490, protein: 6, carbs: 50, fats: 28, portion: "100g" },
  { id: "s26", name: "Chocolate Barfi", calories: 460, protein: 5, carbs: 56, fats: 22, portion: "100g" },
  { id: "s27", name: "White Barfi", calories: 410, protein: 6, carbs: 55, fats: 20, portion: "100g" },
  { id: "s28", name: "Anjeer Barfi", calories: 430, protein: 4, carbs: 48, fats: 20, portion: "100g" },
  { id: "s29", name: "Lauki Halwa", calories: 330, protein: 4, carbs: 45, fats: 15, portion: "100g" },
  { id: "s30", name: "Dry Fruit Ladoo", calories: 520, protein: 7, carbs: 45, fats: 30, portion: "2 pieces (~100g)" },
  { id: "s31", name: "Pineapple Sheera", calories: 320, protein: 3, carbs: 48, fats: 12, portion: "100g" },
  { id: "s32", name: "Badam Halwa", calories: 550, protein: 6, carbs: 45, fats: 36, portion: "100g" },
  { id: "s33", name: "Chikki (Peanut)", calories: 480, protein: 9, carbs: 50, fats: 24, portion: "100g" },
  { id: "s34", name: "Til Chikki", calories: 460, protein: 8, carbs: 48, fats: 22, portion: "100g" },
  { id: "s35", name: "Boondi Ladoo", calories: 410, protein: 5, carbs: 52, fats: 20, portion: "2 laddoos (~100g)" },
  { id: "s36", name: "Kharwas", calories: 280, protein: 6, carbs: 25, fats: 15, portion: "100g" },
  { id: "s37", name: "Kharbuja Halwa", calories: 320, protein: 3, carbs: 44, fats: 14, portion: "100g" },
  { id: "s38", name: "Mysore Pak", calories: 520, protein: 5, carbs: 58, fats: 30, portion: "100g" },
  { id: "s39", name: "Paneer Barfi", calories: 420, protein: 8, carbs: 45, fats: 20, portion: "100g" },
  { id: "s40", name: "Shahi Tukda", calories: 350, protein: 5, carbs: 45, fats: 18, portion: "1 piece (~100g)" },
  { id: "s41", name: "Kesari Ladoo", calories: 430, protein: 6, carbs: 50, fats: 20, portion: "100g" },
  { id: "s42", name: "Khoya Barfi", calories: 450, protein: 7, carbs: 55, fats: 20, portion: "100g" },
  { id: "s43", name: "Chocolate Modak", calories: 470, protein: 5, carbs: 58, fats: 22, portion: "100g" },
  { id: "s44", name: "Coconut Ladoo", calories: 410, protein: 4, carbs: 48, fats: 20, portion: "2 pieces (~100g)" },
  { id: "s45", name: "Dhokla (Sweet)", calories: 160, protein: 5, carbs: 25, fats: 4, portion: "100g" },
  { id: "s46", name: "Pineapple Barfi", calories: 380, protein: 4, carbs: 52, fats: 16, portion: "100g" },
  { id: "s47", name: "Kesari Modak", calories: 420, protein: 5, carbs: 50, fats: 20, portion: "2 pieces (~100g)" },
  { id: "s48", name: "Badam Katli", calories: 510, protein: 7, carbs: 48, fats: 28, portion: "100g" },
  { id: "s49", name: "Elaichi Peda", calories: 390, protein: 6, carbs: 50, fats: 18, portion: "100g" },
  { id: "s50", name: "Khoya Gujiya", calories: 420, protein: 6, carbs: 54, fats: 20, portion: "1 piece (~100g)" },
  { id: "p1", name: "Kurkure Masala Munch", calories: 519, protein: 6, carbs: 52, fats: 32, portion: "100g" },
  { id: "p2", name: "Lays Classic Salted", calories: 536, protein: 6.5, carbs: 52, fats: 34, portion: "100g" },
  { id: "p3", name: "Hide & Seek Fab", calories: 490, protein: 5, carbs: 70, fats: 22, portion: "100g" },
  { id: "p4", name: "Parle-G Biscuits", calories: 450, protein: 6, carbs: 75, fats: 14, portion: "100g" },
  { id: "p5", name: "Good Day Cashew Biscuits", calories: 500, protein: 6, carbs: 64, fats: 24, portion: "100g" },
  { id: "p6", name: "Oreo", calories: 480, protein: 5, carbs: 70, fats: 21, portion: "100g" },
  { id: "p7", name: "Perk Chocolate", calories: 485, protein: 4, carbs: 70, fats: 22, portion: "100g" },
  { id: "p8", name: "5 Star Bar", calories: 470, protein: 3.5, carbs: 65, fats: 20, portion: "100g" },
  { id: "p9", name: "Dairy Milk Silk", calories: 550, protein: 6.5, carbs: 54, fats: 34, portion: "100g" },
  { id: "p10", name: "Munch", calories: 500, protein: 4, carbs: 65, fats: 24, portion: "100g" },
  { id: "p11", name: "Snickers", calories: 488, protein: 7, carbs: 52, fats: 26, portion: "100g" },
  { id: "p12", name: "KitKat", calories: 518, protein: 6, carbs: 64, fats: 27, portion: "100g" },
  { id: "p13", name: "Top Ramen Masala Noodles", calories: 470, protein: 8, carbs: 62, fats: 20, portion: "100g" },
  { id: "p14", name: "Maggi Instant Noodles", calories: 450, protein: 7, carbs: 60, fats: 18, portion: "100g" },
  { id: "p15", name: "Chocos Cereal", calories: 379, protein: 6, carbs: 82, fats: 3, portion: "100g" },
  { id: "p16", name: "Amul Ice Cream (Vanilla)", calories: 207, protein: 3, carbs: 24, fats: 11, portion: "100g" },
  { id: "p17", name: "Kwality Wall’s Cornetto", calories: 240, protein: 3, carbs: 30, fats: 11, portion: "120ml" },
  { id: "p18", name: "Amul Kool Flavoured Milk", calories: 85, protein: 3.2, carbs: 12, fats: 2.8, portion: "200ml" },
  { id: "p19", name: "Maaza Mango Drink", calories: 67, protein: 0, carbs: 17, fats: 0, portion: "200ml" },
  { id: "p20", name: "Frooti", calories: 68, protein: 0, carbs: 17, fats: 0, portion: "200ml" },
  { id: "p21", name: "Coca-Cola", calories: 42, protein: 0, carbs: 11, fats: 0, portion: "100ml" },
  { id: "p22", name: "Pepsi", calories: 43, protein: 0, carbs: 11, fats: 0, portion: "100ml" },
  { id: "p23", name: "Mountain Dew", calories: 49, protein: 0, carbs: 13, fats: 0, portion: "100ml" },
  { id: "p24", name: "Red Bull", calories: 45, protein: 0.3, carbs: 11, fats: 0, portion: "100ml" },
  { id: "p25", name: "Bourbon Biscuits", calories: 480, protein: 5, carbs: 68, fats: 22, portion: "100g" },
  { id: "p26", name: "Little Debbie Swiss Roll", calories: 430, protein: 3, carbs: 53, fats: 22, portion: "100g" },
  { id: "p27", name: "Chipsy Sticks", calories: 510, protein: 4.5, carbs: 60, fats: 30, portion: "100g" },
  { id: "p28", name: "Haldiram’s Bhujia", calories: 550, protein: 12, carbs: 45, fats: 35, portion: "100g" },
  { id: "p29", name: "Bikaji Bikaneri Bhujia", calories: 560, protein: 11, carbs: 44, fats: 36, portion: "100g" },
  { id: "p30", name: "Unibic Cookies", calories: 510, protein: 5, carbs: 65, fats: 25, portion: "100g" },
  { id: "p31", name: "Real Fruit Juice (Mixed)", calories: 50, protein: 0.5, carbs: 12, fats: 0, portion: "100ml" },
  { id: "p32", name: "Bingo Mad Angles", calories: 520, protein: 5, carbs: 55, fats: 32, portion: "100g" },
  { id: "p33", name: "Crackjack", calories: 480, protein: 5, carbs: 68, fats: 20, portion: "100g" },
  { id: "p34", name: "Treat (Britannia)", calories: 495, protein: 5, carbs: 66, fats: 24, portion: "100g" },
  { id: "p35", name: "Lotte Chocopie", calories: 440, protein: 4, carbs: 56, fats: 22, portion: "100g" },
  { id: "p36", name: "Frozen Veg Momos", calories: 180, protein: 6, carbs: 25, fats: 5, portion: "100g" },
  { id: "p37", name: "McCain Aloo Tikki", calories: 250, protein: 3, carbs: 30, fats: 13, portion: "100g" },
  { id: "p38", name: "Haldiram’s Rasgulla (Canned)", calories: 180, protein: 3, carbs: 38, fats: 2, portion: "100g" },
  { id: "p39", name: "Amul Cheese Cube", calories: 326, protein: 20, carbs: 2, fats: 26, portion: "100g" },
  { id: "p40", name: "Amul Paneer", calories: 265, protein: 18, carbs: 6, fats: 20, portion: "100g" },
  { id: "p41", name: "Yippee Noodles", calories: 452, protein: 7, carbs: 61, fats: 18, portion: "100g" },
  { id: "p42", name: "Bournvita", calories: 392, protein: 7, carbs: 85, fats: 3, portion: "100g" },
  { id: "p43", name: "Horlicks", calories: 370, protein: 6, carbs: 79, fats: 1.5, portion: "100g" },
  { id: "p44", name: "Nutella", calories: 541, protein: 6, carbs: 57, fats: 31, portion: "100g" },
  { id: "p45", name: "Kissan Jam", calories: 290, protein: 0.2, carbs: 72, fats: 0, portion: "100g" },
  { id: "p46", name: "Peanut Butter (Pintola)", calories: 588, protein: 25, carbs: 15, fats: 49, portion: "100g" },
  { id: "p47", name: "Frozen French Fries", calories: 312, protein: 3, carbs: 41, fats: 15, portion: "100g" },
  { id: "p48", name: "Amul Mithai Mate (Condensed Milk)", calories: 320, protein: 7, carbs: 54, fats: 8, portion: "100g" },
  { id: "p49", name: "Nescafe Instant Coffee (w/ sugar)", calories: 20, protein: 0.3, carbs: 4.5, fats: 0.1, portion: "100ml" },
  { id: "p50", name: "Tang Orange Drink (prepared)", calories: 65, protein: 0, carbs: 16, fats: 0, portion: "100ml" },
  { id: "d1", name: "Vegetable Pulao", calories: 210, protein: 4, carbs: 35, fats: 6, portion: "1 plate (~200g)" },
  { id: "d2", name: "Rajma Rice", calories: 240, protein: 7, carbs: 40, fats: 6, portion: "1 plate (~250g)" },
  { id: "d3", name: "Chole Bhature", calories: 430, protein: 10, carbs: 50, fats: 20, portion: "1 serving (2 bhature + chole)" },
  { id: "d4", name: "Kaddu Sabzi with Chapati", calories: 180, protein: 4, carbs: 25, fats: 7, portion: "2 chapati + sabzi" },
  { id: "d5", name: "Tinda Masala with Roti", calories: 160, protein: 4, carbs: 20, fats: 6, portion: "2 roti + sabzi" },
  { id: "d6", name: "Baingan Bharta with Roti", calories: 200, protein: 5, carbs: 22, fats: 10, portion: "2 roti + bharta" },
  { id: "d7", name: "Soyabean Curry with Rice", calories: 260, protein: 14, carbs: 30, fats: 9, portion: "1 bowl curry + 1 bowl rice" },
  { id: "d8", name: "Aloo Tamatar with Poori", calories: 340, protein: 6, carbs: 40, fats: 16, portion: "3 poori + aloo" },
  { id: "d9", name: "Lauki Chana Dal with Roti", calories: 220, protein: 8, carbs: 30, fats: 7, portion: "2 roti + sabzi" },
  { id: "d10", name: "Ghiya Kofta Curry with Rice", calories: 280, protein: 7, carbs: 32, fats: 12, portion: "1 bowl curry + rice" },
  
  { id: "d11", name: "Masoor Dal with Jeera Rice", calories: 250, protein: 9, carbs: 36, fats: 7, portion: "1 bowl dal + rice" },
  { id: "d12", name: "Kadhi Pakora with Rice", calories: 320, protein: 8, carbs: 35, fats: 14, portion: "1 bowl kadhi + rice" },
  { id: "d13", name: "Roti with Methi Aloo", calories: 190, protein: 5, carbs: 25, fats: 8, portion: "2 roti + sabzi" },
  { id: "d14", name: "Vegetable Khichdi", calories: 220, protein: 7, carbs: 32, fats: 8, portion: "1 bowl (~200g)" },
  { id: "d15", name: "Chana Dal with Lauki and Roti", calories: 230, protein: 9, carbs: 30, fats: 8, portion: "2 roti + sabzi" },
  { id: "d16", name: "Palak Tofu with Rice", calories: 270, protein: 12, carbs: 28, fats: 10, portion: "1 plate" },
  { id: "d17", name: "Matar Paneer with Chapati", calories: 280, protein: 12, carbs: 25, fats: 14, portion: "2 chapati + sabzi" },
  { id: "d18", name: "Chana Masala with Roti", calories: 250, protein: 10, carbs: 30, fats: 9, portion: "2 roti + chana" },
  { id: "d19", name: "Tamarind Rice", calories: 230, protein: 4, carbs: 35, fats: 8, portion: "1 plate (~200g)" },
  { id: "d20", name: "Dahi Aloo with Roti", calories: 210, protein: 5, carbs: 28, fats: 9, portion: "2 roti + sabzi" },
  
  { id: "d21", name: "Aloo Palak with Roti", calories: 190, protein: 4, carbs: 25, fats: 8, portion: "2 roti + sabzi" },
  { id: "d22", name: "Mixed Dal with Rice", calories: 240, protein: 10, carbs: 35, fats: 6, portion: "1 bowl dal + 1 bowl rice" },
  { id: "d23", name: "Cabbage Sabzi with Roti", calories: 160, protein: 3, carbs: 22, fats: 7, portion: "2 roti + sabzi" },
  { id: "d24", name: "Bhindi Fry with Roti", calories: 210, protein: 4, carbs: 20, fats: 10, portion: "2 roti + bhindi" },
  { id: "d25", name: "Rava Upma (Dinner version)", calories: 250, protein: 6, carbs: 40, fats: 8, portion: "1 bowl (~200g)" },
  { id: "d26", name: "Tomato Rice", calories: 220, protein: 4, carbs: 36, fats: 7, portion: "1 plate (~200g)" },
  { id: "d27", name: "Paneer Bhurji with Chapati", calories: 280, protein: 14, carbs: 18, fats: 15, portion: "2 roti + bhurji" },
  { id: "d28", name: "Aloo Gobi with Paratha", calories: 310, protein: 6, carbs: 36, fats: 14, portion: "2 paratha + sabzi" },
  { id: "d29", name: "Mushroom Masala with Rice", calories: 240, protein: 8, carbs: 32, fats: 10, portion: "1 bowl curry + rice" },
  { id: "d30", name: "Sambar with Idli", calories: 280, protein: 9, carbs: 38, fats: 9, portion: "3 idli + 1 bowl sambar" },
  
  { id: "d31", name: "Ragi Roti with Palya", calories: 220, protein: 6, carbs: 28, fats: 8, portion: "2 roti + sabzi" },
  { id: "d32", name: "Tamarind Bhindi with Rice", calories: 230, protein: 5, carbs: 34, fats: 9, portion: "1 bowl sabzi + rice" },
  { id: "d33", name: "Moong Dal Tadka with Chapati", calories: 230, protein: 10, carbs: 28, fats: 8, portion: "2 chapati + dal" },
  { id: "d34", name: "Curry Leaves Rice", calories: 210, protein: 3, carbs: 35, fats: 7, portion: "1 plate (~200g)" },
  { id: "d35", name: "Aloo Capsicum with Roti", calories: 200, protein: 5, carbs: 26, fats: 8, portion: "2 roti + sabzi" },
  { id: "d36", name: "Punjabi Kadhi with Roti", calories: 260, protein: 7, carbs: 25, fats: 11, portion: "2 roti + kadhi" },
  { id: "d37", name: "Peas Pulao with Raita", calories: 280, protein: 7, carbs: 38, fats: 10, portion: "1 plate + raita" },
  { id: "d38", name: "Paneer Tikka with Mint Roti", calories: 320, protein: 18, carbs: 25, fats: 14, portion: "6 pieces + 2 roti" },
  { id: "d39", name: "Methi Thepla with Curd", calories: 300, protein: 6, carbs: 32, fats: 14, portion: "2 thepla + curd" },
  { id: "d40", name: "Karela Sabzi with Roti", calories: 180, protein: 5, carbs: 20, fats: 8, portion: "2 roti + sabzi" },
  
  { id: "d41", name: "Mutter Methi Malai with Paratha", calories: 320, protein: 10, carbs: 28, fats: 18, portion: "2 paratha + sabzi" },
  { id: "d42", name: "Bottle Gourd Curry with Roti", calories: 170, protein: 4, carbs: 22, fats: 6, portion: "2 roti + curry" },
  { id: "d43", name: "Sem Bhaji with Roti", calories: 200, protein: 6, carbs: 25, fats: 9, portion: "2 roti + sabzi" },
  { id: "d44", name: "Rice with Aloo Baingan", calories: 260, protein: 5, carbs: 38, fats: 9, portion: "1 bowl sabzi + rice" },
  { id: "d45", name: "Masala Paratha with Pickle", calories: 300, protein: 6, carbs: 35, fats: 14, portion: "2 paratha" },
  { id: "d46", name: "Vegetable Handi with Roti", calories: 280, protein: 8, carbs: 30, fats: 12, portion: "2 roti + sabzi" },
  { id: "d47", name: "Bhindi Do Pyaza with Rice", calories: 230, protein: 6, carbs: 30, fats: 10, portion: "1 bowl + rice" },
  { id: "d48", name: "Vegetable Stew with Rice", calories: 240, protein: 6, carbs: 32, fats: 10, portion: "1 bowl + rice" },
  { id: "d49", name: "Paneer Kofta Curry with Rice", calories: 340, protein: 12, carbs: 32, fats: 16, portion: "1 bowl + rice" },
  { id: "d50", name: "Roti with Bhindi Masala", calories: 200, protein: 5, carbs: 25, fats: 9, portion: "2 roti + bhindi" },
  { id: "cd1", name: "Coca-Cola (500ml)", calories: 210, protein: 0, carbs: 53, fats: 0, portion: "500ml bottle" },
  { id: "cd2", name: "Pepsi (300ml)", calories: 135, protein: 0, carbs: 34, fats: 0, portion: "300ml can" },
  { id: "cd3", name: "Sprite (600ml)", calories: 250, protein: 0, carbs: 63, fats: 0, portion: "600ml bottle" },
  { id: "cd4", name: "Mountain Dew (500ml)", calories: 225, protein: 0, carbs: 56, fats: 0, portion: "500ml bottle" },
  { id: "cd5", name: "Fanta Orange (300ml)", calories: 140, protein: 0, carbs: 35, fats: 0, portion: "300ml can" },
  { id: "cd6", name: "Thumbs Up (750ml)", calories: 315, protein: 0, carbs: 79, fats: 0, portion: "750ml bottle" },
  { id: "cd7", name: "Appy Fizz (250ml)", calories: 110, protein: 0, carbs: 27, fats: 0, portion: "250ml bottle" },
  { id: "cd8", name: "Maaza Mango (600ml)", calories: 270, protein: 0, carbs: 66, fats: 0, portion: "600ml bottle" },
  { id: "cd9", name: "Slice Mango (200ml)", calories: 110, protein: 0, carbs: 26, fats: 0, portion: "200ml pack" },
  { id: "cd10", name: "Bovonto (300ml)", calories: 145, protein: 0, carbs: 36, fats: 0, portion: "300ml bottle" },
  
  { id: "cd11", name: "Minute Maid Pulpy Orange (500ml)", calories: 220, protein: 1, carbs: 53, fats: 0, portion: "500ml bottle" },
  { id: "cd12", name: "Real Fruit Power Mango (200ml)", calories: 100, protein: 0, carbs: 24, fats: 0, portion: "200ml pack" },
  { id: "cd13", name: "Frooti (160ml)", calories: 95, protein: 0, carbs: 23, fats: 0, portion: "160ml pack" },
  { id: "cd14", name: "Paper Boat Aam Panna", calories: 90, protein: 0, carbs: 21, fats: 0, portion: "200ml pouch" },
  { id: "cd15", name: "Paper Boat Jaljeera", calories: 70, protein: 0, carbs: 16, fats: 0, portion: "200ml pouch" },
  { id: "cd16", name: "Paper Boat Kokum", calories: 80, protein: 0, carbs: 18, fats: 0, portion: "200ml pouch" },
  { id: "cd17", name: "Bisleri Limonata", calories: 115, protein: 0, carbs: 28, fats: 0, portion: "250ml bottle" },
  { id: "cd18", name: "Bisleri Fonzo", calories: 130, protein: 0, carbs: 31, fats: 0, portion: "250ml bottle" },
  { id: "cd19", name: "Red Bull Energy Drink (250ml)", calories: 110, protein: 0, carbs: 28, fats: 0, portion: "250ml can" },
  { id: "cd20", name: "Monster Energy Drink (350ml)", calories: 160, protein: 0, carbs: 40, fats: 0, portion: "350ml can" },
  
  { id: "cd21", name: "Amul Kool Kesar (200ml)", calories: 180, protein: 6, carbs: 24, fats: 6, portion: "200ml bottle" },
  { id: "cd22", name: "Amul Kool Rose (200ml)", calories: 170, protein: 6, carbs: 23, fats: 5, portion: "200ml bottle" },
  { id: "cd23", name: "Mother Dairy Lassi (200ml)", calories: 160, protein: 4, carbs: 26, fats: 5, portion: "200ml bottle" },
  { id: "cd24", name: "Mother Dairy Chach", calories: 90, protein: 3, carbs: 10, fats: 3, portion: "200ml bottle" },
  { id: "cd25", name: "Yakult Probiotic Drink", calories: 50, protein: 1, carbs: 11, fats: 0, portion: "65ml bottle" },
  { id: "cd26", name: "Tropicana Apple Juice (200ml)", calories: 90, protein: 0, carbs: 21, fats: 0, portion: "200ml pack" },
  { id: "cd27", name: "Tropicana Mixed Fruit (200ml)", calories: 100, protein: 0, carbs: 24, fats: 0, portion: "200ml pack" },
  { id: "cd28", name: "Tropicana Orange Delight", calories: 95, protein: 0, carbs: 22, fats: 0, portion: "200ml pack" },
  { id: "cd29", name: "Real Guava Juice", calories: 110, protein: 0, carbs: 25, fats: 0, portion: "200ml pack" },
  { id: "cd30", name: "Real Litchi Juice", calories: 105, protein: 0, carbs: 24, fats: 0, portion: "200ml pack" },
  
  { id: "cd31", name: "7UP (500ml)", calories: 210, protein: 0, carbs: 53, fats: 0, portion: "500ml bottle" },
  { id: "cd32", name: "Limca (300ml)", calories: 135, protein: 0, carbs: 34, fats: 0, portion: "300ml can" },
  { id: "cd33", name: "Peach Ice Tea (250ml)", calories: 90, protein: 0, carbs: 22, fats: 0, portion: "250ml can" },
  { id: "cd34", name: "Lemon Ice Tea (250ml)", calories: 85, protein: 0, carbs: 21, fats: 0, portion: "250ml can" },
  { id: "cd35", name: "Paper Boat Sugarcane Juice", calories: 130, protein: 0, carbs: 32, fats: 0, portion: "250ml pouch" },
  { id: "cd36", name: "B Natural Mixed Fruit Juice", calories: 100, protein: 0, carbs: 25, fats: 0, portion: "200ml pack" },
  { id: "cd37", name: "B Natural Pomegranate", calories: 105, protein: 0, carbs: 26, fats: 0, portion: "200ml pack" },
  { id: "cd38", name: "Amul Kool Café", calories: 180, protein: 5, carbs: 22, fats: 7, portion: "200ml bottle" },
  { id: "cd39", name: "Amul Kool Chocolate", calories: 185, protein: 5, carbs: 23, fats: 7, portion: "200ml bottle" },
  { id: "cd40", name: "Starbucks Cold Brew (bottled)", calories: 70, protein: 1, carbs: 16, fats: 0, portion: "250ml bottle" },
  { id: "cd42", name: "Rose Milk", calories: 190, protein: 5, carbs: 26, fats: 7, portion: "250ml glass" },
  { id: "cd43", name: "Masala Chaas", calories: 90, protein: 3, carbs: 8, fats: 4, portion: "200ml glass" },
  { id: "cd44", name: "Nimbu Pani (sweet)", calories: 80, protein: 0, carbs: 18, fats: 0, portion: "250ml glass" },
  { id: "cd45", name: "Shikanji", calories: 90, protein: 0, carbs: 20, fats: 0, portion: "250ml glass" },
  { id: "cd46", name: "Mint Lemonade", calories: 85, protein: 0, carbs: 20, fats: 0, portion: "250ml glass" },
  { id: "cd47", name: "Jeera Soda", calories: 100, protein: 0, carbs: 24, fats: 0, portion: "250ml bottle" },
  { id: "cd48", name: "Masala Soda", calories: 105, protein: 0, carbs: 25, fats: 0, portion: "250ml glass" },
  { id: "cd49", name: "Coconut Water (fresh)", calories: 45, protein: 0, carbs: 10, fats: 0, portion: "1 coconut (~250ml)" },
  { id: "cd50", name: "Herbal Iced Tea", calories: 60, protein: 0, carbs: 15, fats: 0, portion: "250ml glass" },
  { id: "ff1", name: "Veg Burger", calories: 290, protein: 7, carbs: 35, fats: 12, portion: "1 burger" },
  { id: "ff2", name: "Cheese Burst Pizza (Small)", calories: 500, protein: 12, carbs: 50, fats: 25, portion: "1 pizza (6-inch)" },
  { id: "ff3", name: "Chicken Burger", calories: 360, protein: 18, carbs: 30, fats: 18, portion: "1 burger" },
  { id: "ff4", name: "Paneer Wrap", calories: 380, protein: 14, carbs: 40, fats: 18, portion: "1 wrap" },
  { id: "ff5", name: "Aloo Tikki Burger", calories: 310, protein: 6, carbs: 38, fats: 14, portion: "1 burger" },
  { id: "ff6", name: "Mayo Sandwich", calories: 270, protein: 6, carbs: 28, fats: 14, portion: "2 slices" },
  { id: "ff7", name: "Grilled Veg Sandwich", calories: 250, protein: 6, carbs: 30, fats: 10, portion: "2 slices" },
  { id: "ff8", name: "Chicken Shawarma Roll", calories: 450, protein: 20, carbs: 35, fats: 25, portion: "1 roll" },
  { id: "ff9", name: "Egg Roll", calories: 300, protein: 10, carbs: 30, fats: 15, portion: "1 roll" },
  { id: "ff10", name: "Cheese Sandwich", calories: 310, protein: 9, carbs: 27, fats: 18, portion: "2 slices" },
  
  { id: "ff11", name: "Double Patty Burger", calories: 480, protein: 20, carbs: 38, fats: 26, portion: "1 burger" },
  { id: "ff12", name: "Masala Fries", calories: 320, protein: 4, carbs: 35, fats: 18, portion: "1 medium pack" },
  { id: "ff13", name: "Cheesy Garlic Bread", calories: 370, protein: 8, carbs: 34, fats: 22, portion: "4 pcs" },
  { id: "ff14", name: "Corn & Cheese Pizza Slice", calories: 160, protein: 4, carbs: 18, fats: 8, portion: "1 slice" },
  { id: "ff15", name: "Chicken Popcorn", calories: 280, protein: 15, carbs: 20, fats: 16, portion: "1 box" },
  { id: "ff16", name: "Paneer Kathi Roll", calories: 390, protein: 15, carbs: 40, fats: 18, portion: "1 roll" },
  { id: "ff17", name: "Momos (Veg)", calories: 200, protein: 6, carbs: 28, fats: 8, portion: "6 pcs" },
  { id: "ff18", name: "Momos (Chicken)", calories: 230, protein: 10, carbs: 26, fats: 10, portion: "6 pcs" },
  { id: "ff19", name: "Pizza Puff", calories: 250, protein: 6, carbs: 28, fats: 14, portion: "1 piece" },
  { id: "ff20", name: "Schezwan Sandwich", calories: 290, protein: 7, carbs: 30, fats: 13, portion: "2 slices" },
  
  { id: "ff21", name: "Veg Loaded Pizza (medium slice)", calories: 170, protein: 5, carbs: 22, fats: 7, portion: "1 slice" },
  { id: "ff22", name: "Tandoori Chicken Pizza", calories: 190, protein: 9, carbs: 18, fats: 8, portion: "1 slice" },
  { id: "ff23", name: "Burger with Fries Combo", calories: 600, protein: 15, carbs: 55, fats: 30, portion: "1 serving" },
  { id: "ff24", name: "Chilli Cheese Toast", calories: 280, protein: 7, carbs: 30, fats: 14, portion: "2 slices" },
  { id: "ff25", name: "Chocolate Sandwich", calories: 320, protein: 5, carbs: 38, fats: 15, portion: "2 slices" },
  { id: "ff26", name: "Club Sandwich", calories: 350, protein: 12, carbs: 30, fats: 18, portion: "1 sandwich" },
  { id: "ff27", name: "Cheese Burst Chicken Pizza Slice", calories: 210, protein: 10, carbs: 22, fats: 11, portion: "1 slice" },
  { id: "ff28", name: "Samosa Burger", calories: 330, protein: 6, carbs: 36, fats: 17, portion: "1 burger" },
  { id: "ff29", name: "Veggie Delight Sub (6-inch)", calories: 280, protein: 9, carbs: 38, fats: 8, portion: "6-inch" },
  { id: "ff30", name: "Subway Chicken Tikka Sub", calories: 320, protein: 15, carbs: 30, fats: 12, portion: "6-inch" },
  
  { id: "ff31", name: "Cold Coffee with Ice Cream", calories: 250, protein: 6, carbs: 30, fats: 12, portion: "250ml" },
  { id: "ff32", name: "Veg Cheese Maggi", calories: 320, protein: 7, carbs: 35, fats: 15, portion: "1 plate" },
  { id: "ff33", name: "Paneer Frankie", calories: 380, protein: 12, carbs: 38, fats: 18, portion: "1 roll" },
  { id: "ff34", name: "Chicken Frankie", calories: 410, protein: 18, carbs: 35, fats: 20, portion: "1 roll" },
  { id: "ff35", name: "Double Cheese Burger", calories: 500, protein: 20, carbs: 36, fats: 28, portion: "1 burger" },
  { id: "ff36", name: "Street Style Sandwich", calories: 280, protein: 6, carbs: 30, fats: 14, portion: "1 sandwich" },
  { id: "ff37", name: "Toasted Veggie Sandwich", calories: 260, protein: 7, carbs: 28, fats: 12, portion: "2 slices" },
  { id: "ff38", name: "Stuffed Kulcha (Cheese & Corn)", calories: 310, protein: 9, carbs: 32, fats: 15, portion: "1 kulcha" },
  { id: "ff39", name: "Pav Bhaji Sandwich", calories: 340, protein: 8, carbs: 40, fats: 16, portion: "2 slices" },
  { id: "ff40", name: "Pasta with White Sauce", calories: 400, protein: 12, carbs: 42, fats: 18, portion: "1 plate" },
  
  { id: "ff41", name: "Cheesy Nachos", calories: 350, protein: 6, carbs: 40, fats: 18, portion: "1 plate" },
  { id: "ff42", name: "Paneer Tikka Pizza (slice)", calories: 180, protein: 8, carbs: 20, fats: 9, portion: "1 slice" },
  { id: "ff43", name: "Chicken Cheese Wrap", calories: 420, protein: 20, carbs: 38, fats: 20, portion: "1 wrap" },
  { id: "ff44", name: "Desi Masala Maggi", calories: 300, protein: 6, carbs: 35, fats: 13, portion: "1 plate" },
  { id: "ff45", name: "Veg Grilled Burger", calories: 320, protein: 8, carbs: 32, fats: 14, portion: "1 burger" },
  { id: "ff46", name: "Mini Pizza (Tawa)", calories: 250, protein: 6, carbs: 28, fats: 13, portion: "1 pizza" },
  { id: "ff47", name: "Spinach Corn Sandwich", calories: 280, protein: 7, carbs: 28, fats: 14, portion: "2 slices" },
  { id: "ff48", name: "Creamy Mushroom Pizza Slice", calories: 190, protein: 6, carbs: 20, fats: 9, portion: "1 slice" },
  { id: "ff49", name: "Tandoori Paneer Sub (6-inch)", calories: 340, protein: 13, carbs: 34, fats: 14, portion: "6-inch" },
  { id: "ff50", name: "Veggie Quesadilla", calories: 370, protein: 10, carbs: 32, fats: 20, portion: "1 serving" },
];

// Initialize empty weekly plan
const initialWeeklyPlan: WeeklyPlan = {
  "Monday": {
    "breakfast": { id: "mon-breakfast", name: "Breakfast", items: [] },
    "lunch": { id: "mon-lunch", name: "Lunch", items: [] },
    "snacks": { id: "mon-snacks", name: "Snacks", items: [] },
    "dinner": { id: "mon-dinner", name: "Dinner", items: [] },
  },
  "Tuesday": {
    "breakfast": { id: "tue-breakfast", name: "Breakfast", items: [] },
    "lunch": { id: "tue-lunch", name: "Lunch", items: [] },
    "snacks": { id: "tue-snacks", name: "Snacks", items: [] },
    "dinner": { id: "tue-dinner", name: "Dinner", items: [] },
  },
  "Wednesday": {
    "breakfast": { id: "wed-breakfast", name: "Breakfast", items: [] },
    "lunch": { id: "wed-lunch", name: "Lunch", items: [] },
    "snacks": { id: "wed-snacks", name: "Snacks", items: [] },
    "dinner": { id: "wed-dinner", name: "Dinner", items: [] },
  },
  "Thursday": {
    "breakfast": { id: "thu-breakfast", name: "Breakfast", items: [] },
    "lunch": { id: "thu-lunch", name: "Lunch", items: [] },
    "snacks": { id: "thu-snacks", name: "Snacks", items: [] },
    "dinner": { id: "thu-dinner", name: "Dinner", items: [] },
  },
  "Friday": {
    "breakfast": { id: "fri-breakfast", name: "Breakfast", items: [] },
    "lunch": { id: "fri-lunch", name: "Lunch", items: [] },
    "snacks": { id: "fri-snacks", name: "Snacks", items: [] },
    "dinner": { id: "fri-dinner", name: "Dinner", items: [] },
  },
  "Saturday": {
    "breakfast": { id: "sat-breakfast", name: "Breakfast", items: [] },
    "lunch": { id: "sat-lunch", name: "Lunch", items: [] },
    "snacks": { id: "sat-snacks", name: "Snacks", items: [] },
    "dinner": { id: "sat-dinner", name: "Dinner", items: [] },
  },
  "Sunday": {
    "breakfast": { id: "sun-breakfast", name: "Breakfast", items: [] },
    "lunch": { id: "sun-lunch", name: "Lunch", items: [] },
    "snacks": { id: "sun-snacks", name: "Snacks", items: [] },
    "dinner": { id: "sun-dinner", name: "Dinner", items: [] },
  },
};

// Sample preset meal for convenience
const sampleMeals = {
  "High Protein Breakfast": [
    foodDatabase[7], // Eggs
    foodDatabase[9], // Oatmeal
    foodDatabase[10], // Banana
  ],
  "Balanced Lunch": [
    foodDatabase[0], // Chicken Breast
    foodDatabase[1], // Brown Rice
    foodDatabase[2], // Broccoli
  ],
  "Protein Snack": [
    foodDatabase[6], // Greek Yogurt
    foodDatabase[11], // Almonds
  ],
  "Muscle Building Dinner": [
    foodDatabase[3], // Salmon
    foodDatabase[4], // Sweet Potato
    foodDatabase[8], // Spinach
  ],
};

const Diet = () => {
  const [currentDay, setCurrentDay] = useState<string>("Monday");
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>(initialWeeklyPlan);
  const [isAddingFood, setIsAddingFood] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<{ day: string; type: MealType } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFoods, setFilteredFoods] = useState<FoodItem[]>(foodDatabase);
  const { toast } = useToast();

  // Filter foods when search query changes
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredFoods(foodDatabase);
    } else {
      const filtered = foodDatabase.filter(food => 
        food.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFoods(filtered);
    }
  };

  // Open add food dialog
  const openAddFoodDialog = (day: string, mealType: MealType) => {
    setSelectedMeal({ day, type: mealType });
    setIsAddingFood(true);
    setSearchQuery("");
    setFilteredFoods(foodDatabase);
  };

  // Add food to meal
  const addFoodToMeal = (food: FoodItem) => {
    if (!selectedMeal) return;
    
    const { day, type } = selectedMeal;
    
    setWeeklyPlan(prev => {
      const updatedPlan = { ...prev };
      updatedPlan[day] = { ...updatedPlan[day] };
      updatedPlan[day][type] = { 
        ...updatedPlan[day][type],
        items: [...updatedPlan[day][type].items, { ...food }]
      };
      return updatedPlan;
    });
    
    toast({
      title: "Food added",
      description: `${food.name} added to ${type} for ${day}`,
    });
  };

  // Remove food from meal
  const removeFoodFromMeal = (day: string, mealType: MealType, foodId: string) => {
    setWeeklyPlan(prev => {
      const updatedPlan = { ...prev };
      updatedPlan[day] = { ...updatedPlan[day] };
      updatedPlan[day][mealType] = { 
        ...updatedPlan[day][mealType],
        items: updatedPlan[day][mealType].items.filter(item => item.id !== foodId)
      };
      return updatedPlan;
    });
    
    toast({
      description: "Food item removed",
    });
  };

  // Add a preset meal
  const addPresetMeal = (day: string, mealType: MealType, presetName: string) => {
    if (!sampleMeals[presetName as keyof typeof sampleMeals]) return;
    
    setWeeklyPlan(prev => {
      const updatedPlan = { ...prev };
      updatedPlan[day] = { ...updatedPlan[day] };
      updatedPlan[day][mealType] = { 
        ...updatedPlan[day][mealType],
        items: [...sampleMeals[presetName as keyof typeof sampleMeals]]
      };
      return updatedPlan;
    });
    
    toast({
      title: "Preset meal added",
      description: `${presetName} added to ${mealType} for ${day}`,
    });
  };

  // Calculate meal nutrition totals
  const calculateMealTotals = (meal: Meal) => {
    return meal.items.reduce((totals, item) => {
      return {
        calories: totals.calories + item.calories,
        protein: totals.protein + item.protein,
        carbs: totals.carbs + item.carbs,
        fats: totals.fats + item.fats,
      };
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  // Calculate daily nutrition totals
  const calculateDailyTotals = (day: string) => {
    const mealTypes: MealType[] = ["breakfast", "lunch", "snacks", "dinner"];
    return mealTypes.reduce((totals, mealType) => {
      const mealTotals = calculateMealTotals(weeklyPlan[day][mealType]);
      return {
        calories: totals.calories + mealTotals.calories,
        protein: totals.protein + mealTotals.protein,
        carbs: totals.carbs + mealTotals.carbs,
        fats: totals.fats + mealTotals.fats,
      };
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  // Reset the current day's meal plan
  const resetDayPlan = () => {
    setWeeklyPlan(prev => {
      const updatedPlan = { ...prev };
      updatedPlan[currentDay] = {
        "breakfast": { id: `${currentDay.toLowerCase().substring(0, 3)}-breakfast`, name: "Breakfast", items: [] },
        "lunch": { id: `${currentDay.toLowerCase().substring(0, 3)}-lunch`, name: "Lunch", items: [] },
        "snacks": { id: `${currentDay.toLowerCase().substring(0, 3)}-snacks`, name: "Snacks", items: [] },
        "dinner": { id: `${currentDay.toLowerCase().substring(0, 3)}-dinner`, name: "Dinner", items: [] },
      };
      return updatedPlan;
    });
    
    toast({
      description: `Meal plan for ${currentDay} has been reset`,
    });
  };

  // Save the current meal plan
  const saveMealPlan = () => {
    // In a real app, this would save to a database or local storage
    localStorage.setItem("mealPlan", JSON.stringify(weeklyPlan));
    
    toast({
      title: "Meal plan saved",
      description: "Your meal plan has been saved successfully",
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-fitness-accent to-fitness-secondary text-white py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Weekly Meal Planner</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Plan and track your meals to support your fitness goals
          </p>
        </div>
      </section>
      
      {/* Day Selection */}
      <section className="bg-muted py-6 px-4 border-b">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <div>
              <Select 
                value={currentDay} 
                onValueChange={setCurrentDay}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Day" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(weeklyPlan).map(day => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetDayPlan}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Reset Day
              </Button>
              <Button 
                size="sm" 
                onClick={saveMealPlan}
              >
                <Save className="h-4 w-4 mr-2" /> Save Plan
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Daily Nutrition Summary */}
      <section className="py-8 px-4 bg-card">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold mb-4">Daily Nutrition Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {(() => {
              const dailyTotals = calculateDailyTotals(currentDay);
              // Target values (example)
              const targets = { calories: 2500, protein: 150, carbs: 300, fats: 80 };
              
              return (
                <>
                  <NutritionCard 
                    title="Calories" 
                    current={dailyTotals.calories} 
                    target={targets.calories} 
                    unit="kcal" 
                    color="bg-fitness-primary"
                  />
                  <NutritionCard 
                    title="Protein" 
                    current={dailyTotals.protein} 
                    target={targets.protein} 
                    unit="g" 
                    color="bg-fitness-secondary"
                  />
                  <NutritionCard 
                    title="Carbs" 
                    current={dailyTotals.carbs} 
                    target={targets.carbs} 
                    unit="g" 
                    color="bg-fitness-accent"
                  />
                  <NutritionCard 
                    title="Fats" 
                    current={dailyTotals.fats} 
                    target={targets.fats} 
                    unit="g" 
                    color="bg-fitness-muted"
                  />
                </>
              );
            })()}
          </div>
        </div>
      </section>
      
      {/* Meal Sections */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MealSection 
              day={currentDay}
              mealType="breakfast"
              meal={weeklyPlan[currentDay].breakfast}
              onAddFood={() => openAddFoodDialog(currentDay, "breakfast")}
              onRemoveFood={(foodId) => removeFoodFromMeal(currentDay, "breakfast", foodId)}
              onAddPreset={(presetName) => addPresetMeal(currentDay, "breakfast", presetName)}
            />
            
            <MealSection 
              day={currentDay}
              mealType="lunch"
              meal={weeklyPlan[currentDay].lunch}
              onAddFood={() => openAddFoodDialog(currentDay, "lunch")}
              onRemoveFood={(foodId) => removeFoodFromMeal(currentDay, "lunch", foodId)}
              onAddPreset={(presetName) => addPresetMeal(currentDay, "lunch", presetName)}
            />
            
            <MealSection 
              day={currentDay}
              mealType="snacks"
              meal={weeklyPlan[currentDay].snacks}
              onAddFood={() => openAddFoodDialog(currentDay, "snacks")}
              onRemoveFood={(foodId) => removeFoodFromMeal(currentDay, "snacks", foodId)}
              onAddPreset={(presetName) => addPresetMeal(currentDay, "snacks", presetName)}
            />
            
            <MealSection 
              day={currentDay}
              mealType="dinner"
              meal={weeklyPlan[currentDay].dinner}
              onAddFood={() => openAddFoodDialog(currentDay, "dinner")}
              onRemoveFood={(foodId) => removeFoodFromMeal(currentDay, "dinner", foodId)}
              onAddPreset={(presetName) => addPresetMeal(currentDay, "dinner", presetName)}
            />
          </div>
        </div>
      </section>
      
      {/* Add Food Dialog */}
      <Dialog open={isAddingFood} onOpenChange={setIsAddingFood}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              Add Food to {selectedMeal?.type.charAt(0).toUpperCase() + selectedMeal?.type.slice(1)}
            </DialogTitle>
            <DialogDescription>
              Search for foods or select from the list below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Input 
              placeholder="Search foods..." 
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {filteredFoods.length > 0 ? (
                filteredFoods.map(food => (
                  <div 
                    key={food.id}
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-muted cursor-pointer"
                    onClick={() => addFoodToMeal(food)}
                  >
                    <div>
                      <div className="font-medium">{food.name}</div>
                      <div className="text-sm text-muted-foreground">{food.portion} · {food.calories} kcal</div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No foods found. Try a different search.
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingFood(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface NutritionCardProps {
  title: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}

const NutritionCard = ({ title, current, target, unit, color }: NutritionCardProps) => {
  const percentage = Math.min(Math.round((current / target) * 100), 100);
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <div className="text-2xl font-bold mb-2">
          {current.toFixed(0)}<span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>
        </div>
        <div className="space-y-2">
          <Progress value={percentage} className={`h-2 ${color}`} />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{percentage}%</span>
            <span>Target: {target} {unit}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface MealSectionProps {
  day: string;
  mealType: MealType;
  meal: Meal;
  onAddFood: () => void;
  onRemoveFood: (foodId: string) => void;
  onAddPreset: (presetName: string) => void;
}

const MealSection = ({ day, mealType, meal, onAddFood, onRemoveFood, onAddPreset }: MealSectionProps) => {
  const [isPresetOpen, setIsPresetOpen] = useState(false);
  const mealTotals = calculateMealTotals(meal);
  
  const formatMealType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{formatMealType(mealType)}</h3>
          <div className="flex gap-2">
            <Select open={isPresetOpen} onOpenChange={setIsPresetOpen}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Add Preset" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(sampleMeals).map(presetName => (
                  <SelectItem 
                    key={presetName} 
                    value={presetName}
                    onClick={() => {
                      onAddPreset(presetName);
                      setIsPresetOpen(false);
                    }}
                  >
                    {presetName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline" onClick={onAddFood}>
              <Plus className="h-4 w-4 mr-1" /> Add Food
            </Button>
          </div>
        </div>
        
        {meal.items.length > 0 ? (
          <div className="space-y-4">
            <div className="space-y-3">
              {meal.items.map((food, idx) => (
                <div 
                  key={`${food.id}-${idx}`}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <div className="font-medium">{food.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {food.portion} · P: {food.protein}g · C: {food.carbs}g · F: {food.fats}g
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium">{food.calories} kcal</div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                      onClick={() => onRemoveFood(food.id)}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center pt-2">
              <div className="text-sm font-medium">Total</div>
              <div className="text-sm">
                <span className="font-bold">{mealTotals.calories.toFixed(0)} kcal</span>
                <span className="text-xs text-muted-foreground ml-2">
                  P: {mealTotals.protein.toFixed(0)}g · 
                  C: {mealTotals.carbs.toFixed(0)}g · 
                  F: {mealTotals.fats.toFixed(0)}g
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Utensils className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
            <h4 className="text-lg font-medium mb-1">No foods added yet</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Start building your {mealType} by adding foods
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsPresetOpen(true)}>
                Add Preset Meal
              </Button>
              <Button size="sm" onClick={onAddFood}>
                <Plus className="h-4 w-4 mr-2" /> Add Food
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Helper function to calculate meal nutrition
const calculateMealTotals = (meal: Meal) => {
  return meal.items.reduce((totals, item) => {
    return {
      calories: totals.calories + item.calories,
      protein: totals.protein + item.protein,
      carbs: totals.carbs + item.carbs,
      fats: totals.fats + item.fats,
    };
  }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
};

export default Diet;
