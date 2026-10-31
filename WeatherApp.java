import java.util.Scanner;

public class WeatherApp {

    // Placeholder methods for API calls
    public static double getWeatherData(String date) {
        // Replace this method with the API call to get temperature data for the given date
        return 25.0;
    }

    public static double getWindSpeedData(String date) {
        // Replace this method with the API call to get wind speed data for the given date
        return 10.5;
    }

    public static double getPressureData(String date) {
        // Replace this method with the API call to get pressure data for the given date
        return 1013.25;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("1. Get weather");
            System.out.println("2. Get Wind Speed");
            System.out.println("3. Get Pressure");
            System.out.println("0. Exit");

            System.out.print("Enter your option: ");
            int option = scanner.nextInt();
            scanner.nextLine(); // Consume the new line character left by nextInt()

            switch (option) {
                case 1:
                    System.out.print("Enter the date (YYYY-MM-DD): ");
                    String weatherDate = scanner.nextLine();
                    double temperature = getWeatherData(weatherDate);
                    System.out.printf("Temperature on %s: %.2f degrees Celsius%n%n", weatherDate, temperature);
                    break;

                case 2:
                    System.out.print("Enter the date (YYYY-MM-DD): ");
                    String windSpeedDate = scanner.nextLine();
                    double windSpeed = getWindSpeedData(windSpeedDate);
                    System.out.printf("Wind Speed on %s: %.2f m/s%n%n", windSpeedDate, windSpeed);
                    break;

                case 3:
                    System.out.print("Enter the date (YYYY-MM-DD): ");
                    String pressureDate = scanner.nextLine();
                    double pressure = getPressureData(pressureDate);
                    System.out.printf("Pressure on %s: %.2f hPa%n%n", pressureDate, pressure);
                    break;

                case 0:
                    System.out.println("Exiting the program.");
                    scanner.close();
                    return;

                default:
                    System.out.println("Invalid option. Please try again.\n");
                    break;
            }
        }
    }
}
