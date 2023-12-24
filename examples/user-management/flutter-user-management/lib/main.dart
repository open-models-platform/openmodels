import 'package:flutter/material.dart';
import 'package:openmodels_quickstart/pages/account_page.dart';
import 'package:openmodels_quickstart/pages/login_page.dart';
import 'package:openmodels_quickstart/pages/splash_page.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

Future<void> main() async {
  await OpenModels.initialize(
    // TODO: Replace credentials with your own
    url: 'YOUR_OPENMODELS_URL',
    anonKey: 'YOUR_OPENMODELS_ANON_KEY',
    authFlowType: AuthFlowType.pkce,
  );
  runApp(MyApp());
}

final openmodels = OpenModels.instance.client;

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'OpenModels Flutter',
      theme: ThemeData.dark().copyWith(
        primaryColor: Colors.green,
        textButtonTheme: TextButtonThemeData(
          style: TextButton.styleFrom(
            foregroundColor: Colors.green,
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            foregroundColor: Colors.white,
            backgroundColor: Colors.green,
          ),
        ),
      ),
      initialRoute: '/',
      routes: <String, WidgetBuilder>{
        // Splash page is needed to ensure that authentication and page loading works correctly
        '/': (_) => const SplashPage(),
        '/login': (_) => const LoginPage(),
        '/account': (_) => const AccountPage(),
      },
    );
  }
}
