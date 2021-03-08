<?php
// пример скрипта обработчика для рассчёта результирующей суммы вклада
$data = array(
    'date' => $_POST['date'],
    'summ-deposit' => intval(str_replace(" ", "", $_POST['summ-deposit'])),
    'term-deposit' => $_POST['term-deposit'],
    'adjunction' => $_POST['adjunction'],
    'summ-adjunction' => intval(str_replace(" ", "", $_POST['summ-adjunction']))
);
$currentDate = new DateTime($data['date']);

$summAdjunction = ($data['adjunction'] == 'yes') ? $data['summ-adjunction'] : 0;

$currentMonthSumm = $data['summ-deposit'];

for($i = 0; $i < $data['term-deposit']; $i++) {
    $currentMonth = $currentDate->format("n");
    $currentYear = $currentDate->format('Y');
    $currentMonthDays = cal_days_in_month(CAL_GREGORIAN, $currentMonth, $currentYear); // дней в текущем месяце
    $currentYearDays = date('z', mktime(0, 0, 0, 12, 31, $currentYear)) + 1; // дней в текущем году

    $currentMonthSumm = $currentMonthSumm + $currentMonthSumm * $currentMonthDays * (0.1 / $currentYearDays);
    if($i != 0) $currentMonthSumm += $summAdjunction;
    
    $currentDate->modify('+ 1 month');    
}

echo json_encode(array("result" => round($currentMonthSumm)));